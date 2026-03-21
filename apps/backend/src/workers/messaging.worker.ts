/**
 * Messaging Worker — processes WHATSAPP_MESSAGES and EMAIL_MESSAGES queues
 * via BullMQ and calls WATI / Resend APIs to send messages.
 *
 * Rate limiting: BullMQ limiter handles 1 msg/sec for emails.
 * Retries: BullMQ handles automatic retries with exponential backoff.
 * Template caching: In-memory cache with 60s TTL avoids per-message DB queries.
 */
import { createWorker, addJob, QUEUES } from '@/queue';
import type { WhatsAppMessageJob, EmailMessageJob } from '@/queue/types';
import type { Job } from 'bullmq';
import { config } from '@/config';
import { db } from '@/db';
import { commLog, failedMessages, messageSendLog, batches, watiTemplates, type BatchStats } from '@/db/schema';
import { eq, gte, asc, desc, sql } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { resolveParams } from '@/services/TemplateEngine';
import { BatchService } from '@/services/BatchService';

// ─── Template cache (60s TTL) ────────────────────────────────────────────────

const templateCache = new Map<number, { template: unknown; cachedAt: number }>();
const CACHE_TTL = 60_000;

async function getCachedTemplate(bookCount: number) {
  const cached = templateCache.get(bookCount);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL) return cached.template;
  const template = await getTemplateForBookCount(bookCount);
  templateCache.set(bookCount, { template, cachedAt: Date.now() });
  return template;
}

async function getTemplateForBookCount(bookCount: number) {
  const fitting = await db.query.watiTemplates.findMany({
    where: gte(watiTemplates.bookCount, bookCount),
    orderBy: [asc(watiTemplates.bookCount)],
    limit: 1,
  });
  if (fitting.length > 0) return fitting[0]!;

  const largest = await db.query.watiTemplates.findMany({
    orderBy: [desc(watiTemplates.bookCount)],
    limit: 1,
  });
  if (largest.length > 0 && largest[0]!.bookCount !== null) return largest[0]!;

  return db.query.watiTemplates.findFirst({
    where: eq(watiTemplates.isActive, true),
  });
}

// ─── Phone number normalization ───────────────────────────────────────────────

function normalizeIndianPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  if (digits.length === 13 && digits.startsWith('091')) return digits.slice(1);
  return digits;
}

// ─── WATI ────────────────────────────────────────────────────────────────────

async function sendWhatsApp(job: WhatsAppMessageJob): Promise<string> {
  if (!config.wati.baseUrl || !config.wati.apiKey) {
    throw new Error('WATI not configured');
  }

  const bookCount = job.books?.length ?? 0;
  const tmpl = await getCachedTemplate(bookCount) as typeof watiTemplates.$inferSelect | undefined;
  console.log(`[messaging] batch=${job.batchId} teacher=${job.name} books=${bookCount} template=${tmpl?.templateName ?? 'legacy'}`);

  let templateName: string;
  let parameters: { name: string; value: string }[];

  if (tmpl && tmpl.params && tmpl.params.length > 0) {
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

// ─── WATI Bulk Send (available for future use) ────────────────────────────────
// This function uses WATI's v2 bulk broadcast API to send up to 100 messages
// per request. It is NOT currently wired into the main per-message flow above,
// which remains simpler to debug and rate-limit. Enable this when bulk sending
// is needed for high-throughput batches (e.g. 10K+ teachers).

type BulkWhatsAppMessage = {
  phone: string;
  name: string;
  books: { title: string; specimenUrl: string; productId: string; author?: string | null }[];
  batchId: string;
  school?: string;
  city?: string;
  email?: string;
};

async function sendWhatsAppBulk(
  messages: BulkWhatsAppMessage[]
): Promise<{ sent: number; failed: number }> {
  if (!config.wati.baseUrl || !config.wati.apiKey) {
    throw new Error('WATI not configured');
  }

  const BULK_CHUNK_SIZE = 100;
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < messages.length; i += BULK_CHUNK_SIZE) {
    const chunk = messages.slice(i, i + BULK_CHUNK_SIZE);

    // All messages in a chunk must use the same template; pick based on first message's book count
    const bookCount = chunk[0]?.books?.length ?? 0;
    const tmpl = await getCachedTemplate(bookCount) as typeof watiTemplates.$inferSelect | undefined;
    const templateName = tmpl?.templateName ?? config.wati.templateName ?? 'specimen_dispatch';

    const receivers = chunk.map((msg) => {
      const params = tmpl?.params && tmpl.params.length > 0
        ? resolveParams(tmpl.params, {
            teacherName: msg.name,
            teacherPhone: msg.phone,
            teacherEmail: msg.email,
            school: msg.school,
            city: msg.city,
            batchId: msg.batchId,
            books: msg.books ?? [],
          })
        : [
            { name: 'name', value: msg.name },
            { name: 'specimen_details', value: msg.books.map((b) => `${b.title}: ${b.specimenUrl}`).join('\n') },
          ];

      return {
        whatsappNumber: normalizeIndianPhone(msg.phone),
        customParams: params.map((p) => ({ name: p.name, value: p.value })),
      };
    });

    const url = `${config.wati.baseUrl}/api/v2/sendTemplateMessages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.wati.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        template_name: templateName,
        broadcast_name: chunk[0]?.batchId ?? 'bulk',
        receivers,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error(`[messaging] WATI bulk API error ${response.status}: ${text}`);
      failed += chunk.length;
    } else {
      sent += chunk.length;
    }
  }

  return { sent, failed };
}

// ─── Resend ───────────────────────────────────────────────────────────────────

async function sendEmail(job: EmailMessageJob): Promise<string> {
  if (!config.resend.apiKey) throw new Error('Resend not configured');

  const { Resend } = await import('resend');
  const resend = new Resend(config.resend.apiKey);

  const loginLink = job.specimenDetails; // Now contains the login URL

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
    // Atomically increment messagesProcessed counter
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

  // Check if message was cancelled before sending
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

  // Mark sent
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

  await incrementAndCheckComplete(batchId);
}

// ─── BullMQ Workers ──────────────────────────────────────────────────────────

// WhatsApp worker — 1 msg/sec via sleep (WATI rate limit)
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

    // Only DLQ on final failure
    if (job.attemptsMade >= maxAttempts) {
      const errorMessage = err.message;
      try {
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
      // Update commLog with error for intermediate failures
      await db
        .update(commLog)
        .set({ lastError: err.message, attemptCount: job.attemptsMade, lastAttemptAt: new Date(), updatedAt: new Date() })
        .where(eq(commLog.id, data.commLogId));
    }
  });
}

console.log('[messaging-worker] Ready (WhatsApp: 1/sec, Email: 1/sec via limiter)');
