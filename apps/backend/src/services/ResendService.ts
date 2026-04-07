/**
 * ResendService — bulk email sending via Resend.
 *
 * Uses individual send() calls per email (NOT resend.batch.send) because the batch
 * API returns a single error for the entire chunk if any email fails — making all
 * emails in the chunk unretryable individually. Individual sends allow per-email
 * retry and accurate DLQ tracking.
 *
 * Rate limit: 1 email/sec via built-in delay loop.
 */
import { config } from '@/config';
import { formatName } from '@/utils/formatName';
import { logApiCall } from '@/services/ApiCallLogger';

export type BulkEmailMessage = {
  commLogId: string;
  email: string;
  name: string;
  specimenDetails: string;
  books: { title: string; specimenUrl: string; productId: string; author?: string | null }[];
  batchId: string;
};

const SEND_DELAY_MS = 1000; // Resend rate limit: ~1 email/sec

function buildEmailHtml(
  name: string,
  specimenDetails: string,
  books: { title: string; specimenUrl: string; productId: string; author?: string | null }[]
): string {
  const bookListHtml = books.length > 0
    ? books.map((b) => `<li><strong>${b.title}</strong> by ${formatName(b.author) || 'Pradeep Publications'}</li>`).join('\n')
    : '';
  return `
    <p>Dear ${name},</p>
    <p>We highly value your trust in Pradeep's Books over the years.</p>
    <p>In our endeavour to equip you with our resource material in a better and instant manner, we have now brought for you the digital versions of our following books for your kind review and recommendation:</p>
    ${bookListHtml ? `<ol style="padding-left:20px;">${bookListHtml}</ol>` : ''}
    <p>The access link for the digital copies is shared below for your convenience:</p>
    <p><a href="${specimenDetails}">${specimenDetails}</a></p>
    <p>Appreciating your unwavering patronage and assuring you of our constant and consistent efforts to bring you standard academic books from time to time.</p>
    <p>Pradeep Jain<br/>Chairman</p>
  `;
}

export async function sendEmailBulk(
  messages: BulkEmailMessage[]
): Promise<{ sentIds: string[]; failedIds: string[]; errors: Record<string, string> }> {
  if (config.disableMessaging) {
    console.log(`[ResendService] DISABLE_MESSAGING=true — skipping ${messages.length} emails`);
    return { sentIds: messages.map((m) => m.commLogId), failedIds: [], errors: {} };
  }
  if (!config.resend.apiKey) {
    throw new Error('Resend not configured');
  }

  const { Resend } = await import('resend');
  const resend = new Resend(config.resend.apiKey);
  const from = `${config.resend.fromName} <${config.resend.fromEmail}>`;
  const sentIds: string[] = [];
  const failedIds: string[] = [];
  const errors: Record<string, string> = {};

  for (const msg of messages) {
    const t0 = Date.now();
    let statusCode: number | undefined;
    let responseBody: unknown;
    let errMsg: string | undefined;

    try {
      const { data, error } = await resend.emails.send({
        from,
        to: msg.email,
        subject: `Digital Specimen Books from Pradeep Publications`,
        html: buildEmailHtml(msg.name, msg.specimenDetails, msg.books),
      });

      if (error) {
        errMsg = error.message ?? JSON.stringify(error);
        statusCode = 400;
        responseBody = error;
        console.error(`[ResendService] email failed to ${msg.email}:`, errMsg);
        errors[msg.commLogId] = errMsg;
        failedIds.push(msg.commLogId);
      } else {
        statusCode = 200;
        responseBody = { id: data?.id };
        console.log(`[ResendService] email sent to ${msg.email} (${data?.id ?? 'no-id'})`);
        sentIds.push(msg.commLogId);
      }
    } catch (err) {
      errMsg = (err as Error).message;
      statusCode = 500;
      responseBody = { error: errMsg };
      console.error(`[ResendService] email exception for ${msg.email}:`, errMsg);
      errors[msg.commLogId] = errMsg;
      failedIds.push(msg.commLogId);
    }

    await logApiCall({
      service: 'resend',
      endpoint: '/emails',
      requestBody: { from, to: msg.email, subject: 'Digital Specimen Books from Pradeep Publications' },
      responseBody,
      statusCode,
      errorMessage: errMsg,
      latencyMs: Date.now() - t0,
      batchId: msg.batchId,
      commLogId: msg.commLogId,
      teacherEmail: msg.email,
      teacherName: msg.name,
    });

    // Rate limit: 1 email/sec
    if (messages.indexOf(msg) < messages.length - 1) {
      await new Promise((r) => setTimeout(r, SEND_DELAY_MS));
    }
  }

  console.log(`[ResendService] bulk complete: ${sentIds.length} sent, ${failedIds.length} failed (of ${messages.length})`);
  return { sentIds, failedIds, errors };
}
