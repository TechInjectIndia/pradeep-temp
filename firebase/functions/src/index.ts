import { onRequest } from 'firebase-functions/v2/https';
import { registerProductionAdapters } from './adapters/registerProductionAdapters';

// ---------------------------------------------------------------------------
// Bootstrap: register production adapters before any request handling
// ---------------------------------------------------------------------------
registerProductionAdapters();

// ---------------------------------------------------------------------------
// Controllers
// ---------------------------------------------------------------------------

import * as SpecimenController from './controllers/SpecimenController';
import * as BatchController from './controllers/BatchController';
import * as DuplicateController from './controllers/DuplicateController';
import * as MessageController from './controllers/MessageController';
import * as WebhookController from './controllers/WebhookController';
import * as DLQController from './controllers/DLQController';

// ---------------------------------------------------------------------------
// Services (for worker handlers)
// ---------------------------------------------------------------------------

import * as SpecimenService from './services/SpecimenService';
import * as MessagingService from './services/MessagingService';
import * as DLQService from './services/DLQService';

// ---------------------------------------------------------------------------
// Triggers
// ---------------------------------------------------------------------------

export { onAggregationComplete } from './triggers/onAggregationComplete';
export { onBatchStateChange } from './triggers/onBatchStateChange';

// ---------------------------------------------------------------------------
// CORS helper
// ---------------------------------------------------------------------------

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '3600',
};

function withCors(
  handler: (req: any, res: any) => Promise<void>,
): (req: any, res: any) => Promise<void> {
  return async (req, res) => {
    // Set CORS headers on every response
    for (const [key, value] of Object.entries(CORS_HEADERS)) {
      res.set(key, value);
    }

    // Handle preflight OPTIONS
    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    await handler(req, res);
  };
}

// ---------------------------------------------------------------------------
// Shared function options
// ---------------------------------------------------------------------------

const apiOptions = { concurrency: 80 };
const workerOptions = { concurrency: 1 };

// ---------------------------------------------------------------------------
// API endpoints (onRequest v2 functions)
// ---------------------------------------------------------------------------

// Specimen
export const specimenUpload = onRequest(apiOptions, withCors(SpecimenController.uploadSpecimen));
export const specimenCreateOrders = onRequest(
  apiOptions,
  withCors(SpecimenController.createOrders),
);

// Batches
export const batchesList = onRequest(apiOptions, withCors(BatchController.listBatches));
export const batchesGet = onRequest(apiOptions, withCors(BatchController.getBatch));
export const batchesPause = onRequest(apiOptions, withCors(BatchController.pauseBatch));
export const batchesResume = onRequest(apiOptions, withCors(BatchController.resumeBatch));
export const batchesCancel = onRequest(apiOptions, withCors(BatchController.cancelBatch));
export const batchesErrors = onRequest(apiOptions, withCors(BatchController.getBatchErrors));
export const batchesRetryErrors = onRequest(apiOptions, withCors(BatchController.retryBatchErrors));

// Duplicates
export const duplicatesList = onRequest(apiOptions, withCors(DuplicateController.listDuplicates));
export const duplicatesResolve = onRequest(
  apiOptions,
  withCors(DuplicateController.resolveDuplicate),
);

// Messages
export const messagesResend = onRequest(apiOptions, withCors(MessageController.resendMessage));

// Webhooks (no CORS -- called by external services, not browsers)
export const webhooksWati = onRequest(apiOptions, WebhookController.handleWATIWebhook);
export const webhooksResend = onRequest(apiOptions, WebhookController.handleResendWebhook);

// DLQ
export const dlqList = onRequest(apiOptions, withCors(DLQController.listDLQ));
export const dlqRetry = onRequest(apiOptions, withCors(DLQController.retryDLQ));

// ---------------------------------------------------------------------------
// Cloud Task worker handlers
// ---------------------------------------------------------------------------

/**
 * Worker: processes individual order creation tasks from the specimen-orders queue.
 * Each task payload contains { teacherRecordId, batchId }.
 */
export const orderCreationWorker = onRequest(workerOptions, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { teacherRecordId, batchId } = req.body;

    if (!teacherRecordId || !batchId) {
      res.status(400).json({ error: 'teacherRecordId and batchId are required' });
      return;
    }

    await SpecimenService.processOrderCreation(teacherRecordId, batchId);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('orderCreationWorker error:', err);
    res.status(500).json({
      error: 'Order creation task failed',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

/**
 * Worker: processes individual messaging tasks from the specimen-whatsapp
 * and specimen-email queues.
 *
 * Each task payload contains:
 *   { messageId, teacherPhone, teacherEmail, links, batchId, channel, attemptNumber }
 *
 * On failure after max retries, delegates to DLQService.handleMaxRetriesExhausted.
 */
const MAX_ATTEMPTS = 5;

export const messagingWorker = onRequest(workerOptions, async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { messageId, teacherPhone, attemptNumber, ...rest } = req.body;

  if (!messageId) {
    res.status(400).json({ error: 'messageId is required' });
    return;
  }

  const attempt: number = attemptNumber || 1;

  try {
    await MessagingService.processMessageTask(messageId, teacherPhone || '', rest, attempt);

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(`messagingWorker error (attempt ${attempt}):`, err);

    // If max retries exhausted, send to DLQ
    if (attempt >= MAX_ATTEMPTS) {
      try {
        await DLQService.handleMaxRetriesExhausted(
          messageId,
          err instanceof Error ? err : new Error(String(err)),
          attempt,
        );
        // Return 200 so Cloud Tasks does not retry further
        res.status(200).json({ success: false, dlq: true });
        return;
      } catch (dlqErr) {
        console.error('Failed to write to DLQ:', dlqErr);
      }
    }

    // Return 500 so Cloud Tasks retries the task
    res.status(500).json({
      error: 'Messaging task failed',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});
