/**
 * ResendService — bulk email sending via Resend batch API.
 */
import { config } from '@/config';
import { formatName } from '@/utils/formatName';

export type BulkEmailMessage = {
  commLogId: string;
  email: string;
  name: string;
  specimenDetails: string;
  books: { title: string; specimenUrl: string; productId: string; author?: string | null }[];
  batchId: string;
};

const BULK_CHUNK_SIZE = 100;

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
): Promise<{ sentIds: string[]; failedIds: string[] }> {
  if (config.disableMessaging) {
    console.log(`[ResendService] DISABLE_MESSAGING=true — skipping ${messages.length} emails`);
    return { sentIds: messages.map((m) => m.commLogId), failedIds: [] };
  }
  if (!config.resend.apiKey) {
    throw new Error('Resend not configured');
  }

  const { Resend } = await import('resend');
  const resend = new Resend(config.resend.apiKey);
  const from = `${config.resend.fromName} <${config.resend.fromEmail}>`;
  const sentIds: string[] = [];
  const failedIds: string[] = [];

  for (let i = 0; i < messages.length; i += BULK_CHUNK_SIZE) {
    const chunk = messages.slice(i, i + BULK_CHUNK_SIZE);

    const payload = chunk.map((msg) => ({
      from,
      to: msg.email,
      subject: `Digital Specimen Books from Pradeep Publications`,
      html: buildEmailHtml(msg.name, msg.specimenDetails, msg.books),
    }));

    try {
      const result = await resend.batch.send(payload);

      if (result.error) {
        console.error(`[ResendService] batch chunk error:`, result.error);
        failedIds.push(...chunk.map((m) => m.commLogId));
      } else if (result.data && Array.isArray(result.data)) {
        // result.data is { id: string }[] — one per email
        console.log(`[ResendService] bulk chunk sent: ${result.data.length} emails`);
        sentIds.push(...chunk.map((m) => m.commLogId));
      } else {
        failedIds.push(...chunk.map((m) => m.commLogId));
      }
    } catch (err) {
      console.error(`[ResendService] bulk chunk exception:`, (err as Error).message);
      failedIds.push(...chunk.map((m) => m.commLogId));
    }
  }

  return { sentIds, failedIds };
}
