/**
 * Messaging Worker — consumes WHATSAPP_MESSAGES and EMAIL_MESSAGES queues
 * and calls WATI / Resend APIs to send messages.
 */
import { consume, publish } from '@/queue';
import { QUEUES, type WhatsAppMessageJob, type EmailMessageJob } from '@/queue/types';
import { config } from '@/config';
import { db } from '@/db';
import { commLog, failedMessages, messageSendLog, watiTemplates } from '@/db/schema';
import { eq, gte, asc, desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { resolveParams } from '@/services/TemplateEngine';

const MAX_RETRIES = 3;

// ─── Load WATI template by book count ────────────────────────────────────────
// Selection order:
//  1. Template with bookCount >= order's book count (smallest that fits) — e.g. 3 books → spemst_4
//  2. Template with highest bookCount (largest available)
//  3. isActive fallback template

async function getTemplateForBookCount(bookCount: number) {
  // Smallest template that can hold bookCount books
  const fitting = await db.query.watiTemplates.findMany({
    where: gte(watiTemplates.bookCount, bookCount),
    orderBy: [asc(watiTemplates.bookCount)],
    limit: 1,
  });
  if (fitting.length > 0) return fitting[0]!;

  // No exact fit — use largest available template
  const largest = await db.query.watiTemplates.findMany({
    orderBy: [desc(watiTemplates.bookCount)],
    limit: 1,
  });
  if (largest.length > 0 && largest[0]!.bookCount !== null) return largest[0]!;

  // Last resort: the manually activated template
  return db.query.watiTemplates.findFirst({
    where: eq(watiTemplates.isActive, true),
  });
}

// ─── Phone number normalization ───────────────────────────────────────────────

/**
 * Normalize an Indian mobile number to full E.164-style format (without "+").
 * WATI expects 12-digit format: 91XXXXXXXXXX
 * Examples:
 *   "9814029931"  → "919814029931"
 *   "919814029931"→ "919814029931"  (already correct)
 *   "+919814029931"→"919814029931"
 */
function normalizeIndianPhone(phone: string): string {
  // Strip any leading + or spaces
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  if (digits.length === 13 && digits.startsWith('091')) {
    return digits.slice(1);
  }
  // Return as-is if format is unrecognized
  return digits;
}

// ─── WATI ────────────────────────────────────────────────────────────────────

async function sendWhatsApp(job: WhatsAppMessageJob): Promise<string> {
  if (!config.wati.baseUrl || !config.wati.apiKey) {
    throw new Error('WATI not configured');
  }

  // Select template by book count; fall back to legacy if none configured
  const bookCount = job.books?.length ?? 0;
  const tmpl = await getTemplateForBookCount(bookCount);
  console.log(`[messaging-worker] batch=${job.batchId} teacher=${job.name} books=${bookCount} template=${tmpl?.templateName ?? 'legacy'}`);

  let templateName: string;
  let parameters: { name: string; value: string }[];

  if (tmpl && tmpl.params && tmpl.params.length > 0) {
    templateName = tmpl.templateName;
    const ctx = {
      teacherName: job.name,
      teacherPhone: job.phone,
      teacherEmail: job.email,
      school: job.school,
      city: job.city,
      batchId: job.batchId,
      books: job.books ?? [],
    };
    parameters = resolveParams(tmpl.params, ctx);
  } else {
    // Legacy fallback
    templateName = config.wati.templateName || 'specimen_dispatch';
    parameters = [
      { name: 'name', value: job.name },
      { name: 'specimen_details', value: job.specimenDetails },
    ];
  }

  const normalizedPhone = normalizeIndianPhone(job.phone);
  console.log(`[messaging-worker] phone: ${job.phone} → ${normalizedPhone}`);
  const url = `${config.wati.baseUrl}/api/v1/sendTemplateMessage?whatsappNumber=${normalizedPhone}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.wati.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_name: templateName,
      broadcast_name: job.batchId,
      parameters,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`WATI API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as { result?: boolean; local_message_id?: string; id?: string; info?: string };
  if (data.result === false) {
    throw new Error(`WATI rejected message: ${data.info ?? 'unknown error'}`);
  }
  return data.local_message_id ?? data.id ?? 'unknown';
}

// ─── Resend ───────────────────────────────────────────────────────────────────

async function sendEmail(job: EmailMessageJob): Promise<string> {
  if (!config.resend.apiKey) throw new Error('Resend not configured');

  const { Resend } = await import('resend');
  const resend = new Resend(config.resend.apiKey);

  const { data, error } = await resend.emails.send({
    from: `${config.resend.fromName} <${config.resend.fromEmail}>`,
    to: job.email,
    subject: `Your specimen books from VSDS`,
    html: `
      <p>Dear ${job.name},</p>
      <p>Your specimen books are ready. Here are your download links:</p>
      <p>${job.specimenDetails}</p>
      <p>Best regards,<br/>VSDS Team</p>
    `,
  });

  if (error) throw new Error(error.message);
  return data?.id ?? 'unknown';
}

// ─── Handle message ───────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function handleMessage(
  job: WhatsAppMessageJob | EmailMessageJob,
  ack: () => void,
  _nack: (requeue: boolean) => void
) {
  const { commLogId, batchId, retryCount } = job;

  try {
    // Check if message was cancelled before sending
    const log = await db.query.commLog.findFirst({ where: eq(commLog.id, commLogId) });
    if (log?.status === 'CANCELLED') {
      console.log(`[messaging-worker] batch=${batchId} commLog=${commLogId} — cancelled, skipping`);
      ack();
      return;
    }

    let externalId: string;
    if (job.type === 'WHATSAPP') {
      externalId = await sendWhatsApp(job);
    } else {
      externalId = await sendEmail(job);
    }

    // Mark sent
    await db
      .update(commLog)
      .set({ status: 'SENT', externalMessageId: externalId, attemptCount: retryCount + 1, lastAttemptAt: new Date(), updatedAt: new Date() })
      .where(eq(commLog.id, commLogId));

    await db.insert(messageSendLog).values({
      id: nanoid(),
      commLogId,
      batchId,
      channel: job.type,
      attemptNumber: retryCount + 1,
      status: 'sent',
      externalMessageId: externalId,
    });

    await sleep(1000); // 1 message per second rate limit
    ack();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const nextRetry = retryCount + 1;

    await db
      .update(commLog)
      .set({ lastError: errorMessage, attemptCount: nextRetry, lastAttemptAt: new Date(), updatedAt: new Date() })
      .where(eq(commLog.id, commLogId));

    if (nextRetry >= MAX_RETRIES) {
      // Move to DLQ
      await db.insert(failedMessages).values({
        id: nanoid(),
        commLogId,
        batchId,
        channel: job.type,
        teacherPhone: job.type === 'WHATSAPP' ? (job as WhatsAppMessageJob).phone : undefined,
        teacherEmail: job.type === 'EMAIL' ? (job as EmailMessageJob).email : undefined,
        errorType: errorMessage.includes('RATE') ? 'RATE_LIMIT' : 'UNKNOWN',
        errorMessage,
        attemptCount: nextRetry,
        isRetryable: true,
        status: 'FAILED',
      });

      await db
        .update(commLog)
        .set({ status: 'DLQ', updatedAt: new Date() })
        .where(eq(commLog.id, commLogId));

      console.log(`[messaging-worker] batch=${batchId} commLog=${commLogId} → DLQ after ${nextRetry} attempts`);
      await sleep(1000);
      ack(); // Ack from RabbitMQ — it's now in DB DLQ
    } else {
      // Republish with incremented retryCount instead of nack(true) to avoid infinite loop
      const retryJob = { ...job, retryCount: nextRetry };
      const queue = job.type === 'WHATSAPP' ? QUEUES.WHATSAPP_MESSAGES : QUEUES.EMAIL_MESSAGES;
      await sleep(1000); // wait before retry
      await publish(queue, retryJob);
      console.log(`[messaging-worker] batch=${batchId} commLog=${commLogId} retry ${nextRetry}/${MAX_RETRIES} requeued`);
      ack(); // Ack original; new message with updated retryCount is now in queue
    }
  }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function main() {
  console.log('[messaging-worker] Starting... (rate: 1 msg/sec per channel)');
  await Promise.all([
    // prefetch=1 — process one message at a time, 1 second apart
    consume(QUEUES.WHATSAPP_MESSAGES, (msg, ack, nack) =>
      handleMessage(msg as WhatsAppMessageJob, ack, nack)
    , 1),
    consume(QUEUES.EMAIL_MESSAGES, (msg, ack, nack) =>
      handleMessage(msg as EmailMessageJob, ack, nack)
    , 1),
  ]);
  console.log('[messaging-worker] Ready');
}

main().catch((err) => {
  console.error('[messaging-worker] Fatal error:', err);
  process.exit(1);
});
