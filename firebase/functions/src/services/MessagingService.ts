import * as crypto from 'crypto';
import * as AggregationRepository from '../repositories/AggregationRepository';
import * as CommLogRepository from '../repositories/CommLogRepository';
import * as CommunicationRepository from '../repositories/CommunicationRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import * as CloudTasksAdapter from '../infrastructure/cloudtasks/CloudTasksAdapter';
import * as WATIAdapter from '../infrastructure/wati/WATIAdapter';
import * as ResendAdapter from '../infrastructure/resend/ResendAdapter';

const WHATSAPP_QUEUE = 'whatsapp-messages';
const EMAIL_QUEUE = 'email-messages';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WhatsAppPayload {
  phone: string;
  templateName: string;
  params: Record<string, string>;
}

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read completed aggregations for a batch, create comm_log entries, and
 * enqueue Cloud Tasks to the appropriate channel queue.
 */
export async function enqueueMessagesForBatch(
  batchId: string,
): Promise<{ totalMessages: number }> {
  const aggregations = await AggregationRepository.getCompleteByBatchId(batchId);

  if (aggregations.length === 0) {
    return { totalMessages: 0 };
  }

  const batch = await BatchRepository.getById(batchId);
  if (!batch) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const channel: string = (batch as any).channel || 'whatsapp';
  let totalMessages = 0;

  for (const aggregation of aggregations) {
    const agg = aggregation as any;
    const teacherPhone: string = agg.teacherPhone || '';
    const teacherEmail: string = agg.teacherEmail || '';
    const links: any[] = agg.links || [];
    const productIds: string[] = links.map((l: any) => l.productId);

    // Generate idempotency hash
    const messageHash = generateMessageHash(
      teacherPhone || teacherEmail,
      batchId,
      productIds,
    );

    // Check for existing comm_log with this hash (idempotency)
    const existing = await CommLogRepository.findByMessageHash(messageHash);
    if (existing) {
      continue;
    }

    // Create comm_log entry
    const commLog = await CommLogRepository.create({
      batchId,
      teacherMasterId: agg.teacherMasterId,
      teacherRecordId: agg.teacherRecordId,
      aggregationKey: aggregation.id,
      channel,
      teacherPhone,
      teacherEmail,
      messageHash,
      status: 'queued',
      attemptCount: 0,
    });

    // Enqueue to appropriate queue
    const queueName = channel === 'email' ? EMAIL_QUEUE : WHATSAPP_QUEUE;
    const payload: Record<string, unknown> = {
      messageId: commLog.id,
      teacherPhone,
      teacherEmail,
      links,
      batchId,
      channel,
      attemptNumber: 1,
    };

    await CloudTasksAdapter.enqueueTask(queueName, payload);
    totalMessages++;
  }

  // Update batch stats
  if (totalMessages > 0) {
    await BatchRepository.incrementStat(batchId, 'stats.messagesQueued', totalMessages);
  }

  return { totalMessages };
}

/**
 * Cloud Task worker handler -- the actual send logic for a single message.
 *
 * Steps:
 *   1. Idempotency check (comm_log status)
 *   2. Batch status check (skip if cancelled/paused)
 *   3. Send via WATI or Resend
 *   4. Update comm_log with result
 *   5. Create teacher_communication record
 *   6. Update batch stats
 */
export async function processMessageTask(
  messageId: string,
  teacherPhone: string,
  payload: any,
  attemptNumber: number,
): Promise<void> {
  // 1. Fetch comm_log and idempotency check
  const commLog = await CommLogRepository.getById(messageId);
  if (!commLog) {
    throw new Error(`Comm log ${messageId} not found`);
  }

  const log = commLog as any;

  // Skip if already delivered or in DLQ
  if (log.status === 'delivered' || log.status === 'dlq') {
    console.log(`Message ${messageId} already in status ${log.status}, skipping`);
    return;
  }

  // 2. Batch status check
  const batchId: string = log.batchId;
  const batch = await BatchRepository.getById(batchId);
  if (!batch) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const batchStatus: string = (batch as any).status;
  if (batchStatus === 'CANCELLED' || batchStatus === 'PAUSED') {
    console.log(`Batch ${batchId} is ${batchStatus}, skipping message ${messageId}`);
    await CommLogRepository.update(messageId, {
      status: 'skipped',
      skipReason: `batch_${batchStatus.toLowerCase()}`,
    });
    return;
  }

  // 3. Send message
  const channel: string = log.channel || 'whatsapp';
  const links: any[] = payload.links || [];

  try {
    let externalMessageId: string;

    if (channel === 'email') {
      const teacherEmail: string = log.teacherEmail || payload.teacherEmail;
      const emailPayload: EmailPayload = buildEmailPayload(teacherEmail, links, batchId);
      const result = await ResendAdapter.sendEmail(
        teacherEmail,
        emailPayload.subject,
        emailPayload.html,
      );
      externalMessageId = result.messageId;
    } else {
      const phone = teacherPhone || log.teacherPhone;
      const whatsappPayload: WhatsAppPayload = buildWhatsAppPayload(phone, links, batchId);
      const result = await WATIAdapter.sendTemplate(
        phone,
        whatsappPayload.templateName,
        whatsappPayload.params,
      );
      externalMessageId = result.messageId;
    }

    // 4. Update comm_log on success
    await CommLogRepository.update(messageId, {
      status: 'delivered',
      externalMessageId,
      attemptCount: attemptNumber,
      deliveredAt: new Date().toISOString(),
    });

    // 5. Create teacher_communication record
    await CommunicationRepository.create({
      teacherId: log.teacherMasterId,
      batchId,
      channel,
      externalMessageId,
      deliveryStatus: 'delivered',
      commLogId: messageId,
    });

    // 6. Update batch stats
    await BatchRepository.incrementStat(batchId, 'stats.messagesDelivered', 1);
  } catch (err) {
    // Update comm_log with error details
    await CommLogRepository.update(messageId, {
      status: 'failed',
      attemptCount: attemptNumber,
      lastError: err instanceof Error ? err.message : String(err),
      lastAttemptAt: new Date().toISOString(),
    });

    // Re-throw to let the Cloud Task retry or DLQ handler pick it up
    throw err;
  }
}

/**
 * Generate a SHA-256 hash for message idempotency.
 */
export function generateMessageHash(
  teacherPhone: string,
  batchId: string,
  productIds: string[],
): string {
  const input = `${teacherPhone}:${batchId}:${productIds.sort().join(',')}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Build the WhatsApp template payload for WATI.
 */
export function buildWhatsAppPayload(
  teacherPhone: string,
  links: any[],
  batchId: string,
): WhatsAppPayload {
  const linkList = links
    .map((l: any, i: number) => `${i + 1}. ${l.url}`)
    .join('\n');

  return {
    phone: teacherPhone,
    templateName: 'specimen_links',
    params: {
      batch_id: batchId,
      link_count: String(links.length),
      links: linkList,
    },
  };
}

/**
 * Build the email payload for Resend.
 */
export function buildEmailPayload(
  teacherEmail: string,
  links: any[],
  batchId: string,
): EmailPayload {
  const linkListHtml = links
    .map(
      (l: any) =>
        `<li><a href="${l.url}">${l.productId || 'Specimen'}</a> (expires: ${l.expiresAt || 'N/A'})</li>`,
    )
    .join('\n');

  const subject = `Your Specimen Links - Batch ${batchId}`;
  const html = `
    <h2>Your Specimen Links</h2>
    <p>Here are your specimen viewing links for batch <strong>${batchId}</strong>:</p>
    <ul>
      ${linkListHtml}
    </ul>
    <p>Please access them before they expire.</p>
  `.trim();

  return {
    to: teacherEmail,
    subject,
    html,
  };
}
