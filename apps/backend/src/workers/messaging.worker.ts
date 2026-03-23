/**
 * Messaging Worker — processes individual WHATSAPP_MESSAGES and EMAIL_MESSAGES jobs.
 *
 * WhatsApp: used for DLQ retries only. Initial sends go via WatiService.sendWhatsAppBulk.
 * Email: processes all email sends (Resend has no bulk API).
 *
 * Rate limiting: 1 msg/sec sleep for WhatsApp retries, BullMQ limiter for emails.
 * Retries: BullMQ handles automatic retries with exponential backoff.
 */
import { createWorker, addJob, QUEUES } from '@/queue';
import type { WhatsAppMessageJob, EmailMessageJob } from '@/queue/types';
import type { Job } from 'bullmq';
import { config } from '@/config';
import { db } from '@/db';
import { commLog, failedMessages, messageSendLog, batches, watiTemplates, type BatchStats } from '@/db/schema';
import { eq, and, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { resolveParams } from '@/services/TemplateEngine';
import { BatchService } from '@/services/BatchService';
import { getCachedTemplate, normalizeIndianPhone, clearTemplateCache } from '@/services/WatiService';

export { clearTemplateCache };

// ─── WATI single-message send (used for DLQ retries) ─────────────────────────

async function sendWhatsApp(job: WhatsAppMessageJob): Promise<string> {
  if (!config.wati.baseUrl || !config.wati.apiKey) {
    throw new Error('WATI not configured');
  }

  const bookCount = job.books?.length ?? 0;
  const tmpl = await getCachedTemplate(bookCount) as typeof watiTemplates.$inferSelect | undefined;
  console.log(`[messaging] batch=${job.batchId} teacher=${job.name} books=${bookCount} template=${tmpl?.templateName ?? 'legacy'}`);

  let templateName: string;
  let parameters: { name: string; value: string }[];

  const parsedParams = typeof tmpl?.params === 'string' ? JSON.parse(tmpl.params) : (tmpl?.params ?? []);
  if (tmpl && parsedParams.length > 0) {
    templateName = tmpl.templateName;
    parameters = resolveParams(tmpl.params, {
      teacherName: job.name,
      teacherPhone: job.phone,
      teacherEmail: job.email,
      school: job.school,
      city: job.city,
      batchId: job.batchId,
      books: job.books ?? [],
    });
  } else {
    templateName = config.wati.templateName || 'specimen_dispatch';
    parameters = [
      { name: 'name', value: job.name },
      { name: 'specimen_details', value: job.specimenDetails },
    ];
  }

  const normalizedPhone = normalizeIndianPhone(job.phone);
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

  const loginLink = job.specimenDetails;

  const { data, error } = await resend.emails.send({
    from: `${config.resend.fromName} <${config.resend.fromEmail}>`,
    to: job.email,
    subject: `Your Digital Content from Pradeep Publications`,
    html: `
      <p>Dear ${job.name},</p>
      <p>Your digital content is ready. Click the link below to access your books:</p>
      <p><a href="${loginLink}" style="display:inline-block;padding:12px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Access Digital Content</a></p>
      <p style="color:#666;font-size:13px;">Or copy this link: <a href="${loginLink}">${loginLink}</a></p>
      <p>Best regards,<br/>Pradeep Publications</p>
    `,
  });

  if (error) throw new Error(error.message);
  return data?.id ?? 'unknown';
}

// ─── Atomic batch completion check ───────────────────────────────────────────

async function incrementAndCheckComplete(batchId: string) {
  try {
    const [updated] = await db
      .update(batches)
      .set({
        stats: sql`jsonb_set(
          COALESCE(stats, '{}'::jsonb),
          '{messagesProcessed}',
          to_jsonb(COALESCE((stats->>'messagesProcessed')::int, 0) + 1)
        )`,
        updatedAt: new Date(),
      })
      .where(eq(batches.id, batchId))
      .returning();

    const stats = updated?.stats as BatchStats | undefined;
    const processed = stats?.messagesProcessed ?? 0;
    const queued = stats?.messagesQueued ?? 0;

    if (queued > 0 && processed >= queued && updated?.status === 'MESSAGING') {
      try {
        await BatchService.advance(batchId, 'auto_messaging_complete');
        console.log(`[messaging] batch=${batchId} all ${queued} messages processed → COMPLETE`);
      } catch {
        // Another worker already advanced
      }
    }
  } catch (err) {
    console.log(`[messaging] batch=${batchId} completion check:`, (err as Error).message);
  }
}

// ─── Shared message processor ────────────────────────────────────────────────

async function processMessage(job: Job<WhatsAppMessageJob | EmailMessageJob>) {
  const { commLogId, batchId } = job.data;

  const log = await db.query.commLog.findFirst({ where: eq(commLog.id, commLogId) });
  if (log?.status === 'CANCELLED') {
    console.log(`[messaging] batch=${batchId} commLog=${commLogId} — cancelled, skipping`);
    await incrementAndCheckComplete(batchId);
    return;
  }

  let externalId: string;
  if (job.data.type === 'WHATSAPP') {
    externalId = await sendWhatsApp(job.data as WhatsAppMessageJob);
  } else {
    externalId = await sendEmail(job.data as EmailMessageJob);
  }

  await db
    .update(commLog)
    .set({
      status: 'SENT',
      externalMessageId: externalId,
      attemptCount: (job.attemptsMade || 0) + 1,
      lastAttemptAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(commLog.id, commLogId));

  await db.insert(messageSendLog).values({
    id: nanoid(),
    commLogId,
    batchId,
    channel: job.data.type,
    attemptNumber: (job.attemptsMade || 0) + 1,
    status: 'sent',
    externalMessageId: externalId,
  });

  await db
    .update(failedMessages)
    .set({ status: 'RESOLVED', updatedAt: new Date() })
    .where(and(eq(failedMessages.commLogId, commLogId), eq(failedMessages.status, 'RETRYING')));

  await incrementAndCheckComplete(batchId);
}

// ─── BullMQ Workers ──────────────────────────────────────────────────────────

// WhatsApp worker — handles DLQ retries only (initial sends go via bulk)
const waWorker = createWorker<WhatsAppMessageJob>(
  QUEUES.WHATSAPP_MESSAGES,
  async (job) => {
    await processMessage(job as Job<WhatsAppMessageJob | EmailMessageJob>);
    // WATI rate limit: 1 msg/sec
    await new Promise((r) => setTimeout(r, 1000));
  },
  { concurrency: 1 }
);

// Email worker — 1 msg/sec via BullMQ limiter (Resend rate limit)
const emailWorker = createWorker<EmailMessageJob>(
  QUEUES.EMAIL_MESSAGES,
  async (job) => {
    await processMessage(job as Job<WhatsAppMessageJob | EmailMessageJob>);
  },
  {
    concurrency: 1,
    limiter: { max: 1, duration: 1000 },
  }
);

// Handle max retries exhausted — move to DLQ
for (const worker of [waWorker, emailWorker]) {
  worker.on('failed', async (job, err) => {
    if (!job) return;
    const data = job.data as WhatsAppMessageJob | EmailMessageJob;
    const maxAttempts = job.opts?.attempts ?? 3;

    if (job.attemptsMade >= maxAttempts) {
      const errorMessage = err.message;
      try {
        const existing = await db.query.failedMessages.findFirst({
          where: and(eq(failedMessages.commLogId, data.commLogId), eq(failedMessages.status, 'RETRYING')),
        });

        if (existing) {
          await db
            .update(failedMessages)
            .set({
              errorMessage,
              errorType: errorMessage.includes('RATE') ? 'RATE_LIMIT' : 'UNKNOWN',
              attemptCount: job.attemptsMade,
              status: 'FAILED',
              updatedAt: new Date(),
            })
            .where(eq(failedMessages.id, existing.id));
        } else {
          await db.insert(failedMessages).values({
            id: nanoid(),
            commLogId: data.commLogId,
            batchId: data.batchId,
            channel: data.type,
            teacherPhone: data.type === 'WHATSAPP' ? (data as WhatsAppMessageJob).phone : undefined,
            teacherEmail: data.type === 'EMAIL' ? (data as EmailMessageJob).email : undefined,
            errorType: errorMessage.includes('RATE') ? 'RATE_LIMIT' : 'UNKNOWN',
            errorMessage,
            attemptCount: job.attemptsMade,
            isRetryable: true,
            status: 'FAILED',
          });
        }

        await db
          .update(commLog)
          .set({ status: 'DLQ', lastError: errorMessage, updatedAt: new Date() })
          .where(eq(commLog.id, data.commLogId));

        console.log(`[messaging] batch=${data.batchId} commLog=${data.commLogId} → DLQ after ${job.attemptsMade} attempts`);

        await incrementAndCheckComplete(data.batchId);
      } catch (dlqErr) {
        console.error(`[messaging] DLQ insert failed:`, (dlqErr as Error).message);
      }
    } else {
      await db
        .update(commLog)
        .set({ lastError: err.message, attemptCount: job.attemptsMade, lastAttemptAt: new Date(), updatedAt: new Date() })
        .where(eq(commLog.id, data.commLogId));
    }
  });
}

console.log('[messaging-worker] Ready (WhatsApp retries: 1/sec, Email: 1/sec via limiter)');
