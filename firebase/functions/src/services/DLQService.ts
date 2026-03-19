import * as CommLogRepository from '../repositories/CommLogRepository';
import * as FailedMessageRepository from '../repositories/FailedMessageRepository';
import * as BatchErrorRepository from '../repositories/BatchErrorRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';

import { WHATSAPP_QUEUE, EMAIL_QUEUE } from '../constants/queues';

// ---------------------------------------------------------------------------
// Error classification
// ---------------------------------------------------------------------------

const RETRYABLE_ERROR_TYPES = new Set(['RATE_LIMIT', 'TIMEOUT', 'API_DOWN']);

const NON_RETRYABLE_ERROR_TYPES = new Set(['INVALID_PHONE', 'INVALID_EMAIL', 'TEMPLATE_ERROR']);

/**
 * Classify an error into a known category.
 */
export function classifyError(error: Error): string {
  const message = error.message.toLowerCase();

  if (
    message.includes('rate limit') ||
    message.includes('429') ||
    message.includes('too many requests')
  ) {
    return 'RATE_LIMIT';
  }
  if (
    message.includes('timeout') ||
    message.includes('timed out') ||
    message.includes('ETIMEDOUT')
  ) {
    return 'TIMEOUT';
  }
  if (
    message.includes('invalid phone') ||
    message.includes('not a valid whatsapp') ||
    message.includes('phone number')
  ) {
    return 'INVALID_PHONE';
  }
  if (
    message.includes('invalid email') ||
    message.includes('email address') ||
    message.includes('recipient')
  ) {
    return 'INVALID_EMAIL';
  }
  if (
    message.includes('template') ||
    message.includes('template_name') ||
    message.includes('template not found')
  ) {
    return 'TEMPLATE_ERROR';
  }
  if (
    message.includes('503') ||
    message.includes('502') ||
    message.includes('service unavailable') ||
    message.includes('server error')
  ) {
    return 'API_DOWN';
  }

  return 'UNKNOWN';
}

/**
 * Determine whether an error type is retryable.
 */
export function isRetryableError(errorType: string): boolean {
  if (RETRYABLE_ERROR_TYPES.has(errorType)) return true;
  if (NON_RETRYABLE_ERROR_TYPES.has(errorType)) return false;
  // UNKNOWN errors are retryable by default (may be transient)
  return true;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Handle a message that has exhausted its maximum retry attempts.
 *
 * Steps:
 *   1. Classify the error
 *   2. Write to failed_messages
 *   3. Update comm_log status to 'dlq'
 *   4. Write batch_error record
 *   5. Increment batch stats.dlqMessages
 */
export async function handleMaxRetriesExhausted(
  messageId: string,
  error: Error,
  attemptCount: number,
): Promise<void> {
  const commLog = await CommLogRepository.getById(messageId);
  if (!commLog) {
    throw new Error(`Comm log ${messageId} not found`);
  }

  const log = commLog as any;
  const errorType = classifyError(error);
  const retryable = isRetryableError(errorType);

  // 1. Write to failed_messages
  await FailedMessageRepository.create({
    commLogId: messageId,
    batchId: log.batchId,
    teacherMasterId: log.teacherMasterId,
    teacherRecordId: log.teacherRecordId,
    channel: log.channel,
    teacherPhone: log.teacherPhone,
    teacherEmail: log.teacherEmail,
    errorType,
    errorMessage: error.message,
    attemptCount,
    isRetryable: retryable,
    status: 'failed',
  });

  // 2. Update comm_log to 'dlq'
  await CommLogRepository.update(messageId, {
    status: 'dlq',
    errorType,
    lastError: error.message,
    attemptCount,
  });

  // 3. Write batch_error
  await BatchErrorRepository.create({
    batchId: log.batchId,
    stage: 'MESSAGING',
    commLogId: messageId,
    errorType,
    errorMessage: error.message,
    isRetryable: retryable,
  });

  // 4. Increment batch stats
  await BatchRepository.incrementStat(log.batchId, 'stats.dlqMessages', 1);
}

/**
 * Retry specific failed messages from the DLQ.
 *
 * For each message:
 *   - Check retryability
 *   - Check batch is not cancelled
 *   - Re-enqueue to appropriate Cloud Tasks queue
 *   - Update the failed_messages and comm_log records
 */
export async function retryFromDLQ(
  failedMessageIds: string[],
): Promise<{ enqueued: number; skipped: number }> {
  let enqueued = 0;
  let skipped = 0;

  for (const failedMsgId of failedMessageIds) {
    const failedMsg = await FailedMessageRepository.getById(failedMsgId);
    if (!failedMsg) {
      skipped++;
      continue;
    }

    const msg = failedMsg as any;

    // Check retryability
    if (!msg.isRetryable) {
      skipped++;
      continue;
    }

    // Check batch status
    const batch = await BatchRepository.getById(msg.batchId);
    if (!batch || (batch as any).status === 'CANCELLED') {
      skipped++;
      continue;
    }

    const commLog = await CommLogRepository.getById(msg.commLogId);
    if (!commLog) {
      skipped++;
      continue;
    }

    const log = commLog as any;
    const channel: string = msg.channel || log.channel || 'whatsapp';
    const queueName = channel === 'email' ? EMAIL_QUEUE : WHATSAPP_QUEUE;

    // Re-enqueue to Cloud Tasks
    const payload = {
      messageId: msg.commLogId,
      teacherPhone: msg.teacherPhone || log.teacherPhone,
      teacherEmail: msg.teacherEmail || log.teacherEmail,
      batchId: msg.batchId,
      channel,
      attemptNumber: (msg.attemptCount || 0) + 1,
      isRetry: true,
    };

    await AdapterRegistry.getInstance().taskQueue.enqueueTask(queueName, payload);

    // Update records
    await FailedMessageRepository.update(failedMsgId, {
      status: 'retrying',
      retriedAt: new Date().toISOString(),
    });

    await CommLogRepository.update(msg.commLogId, {
      status: 'queued',
      retriedAt: new Date().toISOString(),
    });

    enqueued++;
  }

  return { enqueued, skipped };
}

/**
 * Retry all retryable failed messages for a given batch.
 */
export async function retryAllForBatch(
  batchId: string,
): Promise<{ enqueued: number; skipped: number }> {
  const retryable = await FailedMessageRepository.getRetryableByBatchId(batchId);
  const ids = retryable.map((r: any) => r.id);

  if (ids.length === 0) {
    return { enqueued: 0, skipped: 0 };
  }

  return retryFromDLQ(ids);
}

/**
 * Retry all retryable failed messages across all batches (up to 500).
 */
export async function retryAll(): Promise<{ enqueued: number; skipped: number }> {
  const retryable = await FailedMessageRepository.list({ isRetryable: true }, 500, undefined, 0);
  const failed = retryable.filter((r: any) => r.status === 'failed');
  const ids = failed.map((r: any) => r.id);

  if (ids.length === 0) {
    return { enqueued: 0, skipped: 0 };
  }

  return retryFromDLQ(ids);
}
