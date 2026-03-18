import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchErrorRepository from '../repositories/BatchErrorRepository';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as DLQService from '../services/DLQService';

const MAX_PAGE_SIZE = 100;

function parseSafeInt(value: unknown, defaultVal: number, max: number): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : defaultVal;
  if (isNaN(n) || n < 1) return defaultVal;
  return Math.min(n, max);
}

function isValidId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && id.length <= 128 && /^[\w\-]+$/.test(id);
}

function toISOString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  const ts = value as { seconds?: number; _seconds?: number; toDate?: () => Date };
  if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000).toISOString();
  if (typeof ts._seconds === 'number') return new Date(ts._seconds * 1000).toISOString();
  if (typeof ts.toDate === 'function') return ts.toDate().toISOString();
  return undefined;
}

function buildStagesFromBatch(b: Record<string, unknown>): Array<{ stage: string; total: number; completed: number; failed: number }> {
  const stats = (b.stats as Record<string, number>) || {};
  const totalTeachers = stats.totalTeachers ?? 0;
  const teachersResolved = stats.teachersResolved ?? 0;
  const resolutionErrors = stats.resolutionErrors ?? 0;
  const ordersCreated = stats.ordersCreated ?? 0;
  const expectedOrders = stats.expectedOrders ?? teachersResolved;
  const messagesQueued = stats.messagesQueued ?? 0;
  const messagesDelivered = stats.messagesDelivered ?? 0;
  const messagesFailed = stats.messagesFailed ?? 0;
  const dlqMessages = stats.dlqMessages ?? 0;

  return [
    { stage: 'RESOLUTION', total: totalTeachers, completed: teachersResolved, failed: resolutionErrors },
    { stage: 'ORDERS', total: expectedOrders, completed: ordersCreated, failed: 0 },
    { stage: 'AGGREGATION', total: ordersCreated, completed: ordersCreated, failed: 0 },
    { stage: 'MESSAGES', total: messagesQueued, completed: messagesDelivered, failed: messagesFailed + dlqMessages },
  ];
}

// ---------------------------------------------------------------------------
// GET /batches
// ---------------------------------------------------------------------------

export async function listBatches(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const status = req.query.status as string | undefined;
    const pageSize = parseSafeInt(req.query.pageSize ?? req.query.limit, 20, MAX_PAGE_SIZE);
    const page = parseSafeInt(req.query.page, 1, 100_000);
    const offset = (page - 1) * pageSize;
    const filters = status ? { status } : undefined;

    const [batches, total] = await Promise.all([
      BatchRepository.list(filters, pageSize, undefined, offset),
      BatchRepository.count(filters),
    ]);

    const data = batches.map((batch) => {
      const b = batch as Record<string, unknown>;
      const stats = (b.stats as Record<string, number>) || {};
      return {
        ...b,
        batchId: b.id,
        createdAt: toISOString(b.createdAt) ?? b.createdAt,
        updatedAt: toISOString(b.updatedAt) ?? b.updatedAt,
        teacherCount: stats.totalTeachers ?? 0,
        orderCount: stats.ordersCreated ?? 0,
        messageCount: stats.messagesQueued ?? 0,
        errorCount: (stats.resolutionErrors ?? 0) + (stats.messagesFailed ?? 0) + (stats.dlqMessages ?? 0),
      };
    });

    res.status(200).json({ data, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
  } catch (err) {
    console.error('listBatches error:', err);
    res.status(500).json({ error: 'Failed to list batches', details: err instanceof Error ? err.message : String(err) });
  }
}

// ---------------------------------------------------------------------------
// GET /batches/:batchId
// ---------------------------------------------------------------------------

export async function getBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.query.batchId) as string || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required and must be alphanumeric' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) { res.status(404).json({ error: `Batch ${batchId} not found` }); return; }

    const b = batch as Record<string, unknown>;
    const stats = (b.stats as Record<string, number>) || {};
    const deliveryStatus = {
      sent: stats.messagesQueued ?? 0,
      delivered: stats.messagesDelivered ?? 0,
      read: 0,
      failed: (stats.messagesFailed ?? 0) + (stats.dlqMessages ?? 0),
      pending: Math.max(0, (stats.messagesQueued ?? 0) - (stats.messagesDelivered ?? 0) - (stats.messagesFailed ?? 0) - (stats.dlqMessages ?? 0)),
    };
    const stages = buildStagesFromBatch(b);
    const statusHistory = Array.isArray(b.statusHistory) ? b.statusHistory : [];

    res.status(200).json({
      ...b,
      batchId: b.id ?? batchId,
      createdAt: toISOString(b.createdAt) ?? b.createdAt,
      updatedAt: toISOString(b.updatedAt) ?? b.updatedAt,
      teacherCount: stats.totalTeachers ?? 0,
      orderCount: stats.ordersCreated ?? 0,
      messageCount: stats.messagesQueued ?? 0,
      errorCount: (stats.resolutionErrors ?? 0) + (stats.messagesFailed ?? 0) + (stats.dlqMessages ?? 0),
      deliveryStatus,
      stages,
      statusHistory,
    });
  } catch (err) {
    console.error('getBatch error:', err);
    res.status(500).json({ error: 'Failed to get batch', details: err instanceof Error ? err.message : String(err) });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/pause
// ---------------------------------------------------------------------------

export async function pauseBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.body?.batchId) as string || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    await BatchStateMachine.pauseBatch(batchId);
    res.status(200).json({ batchId, status: 'PAUSED' });
  } catch (err) {
    console.error('pauseBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else if (message.includes('Invalid batch transition')) res.status(409).json({ error: message });
    else res.status(500).json({ error: 'Failed to pause batch', details: message });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/resume
// ---------------------------------------------------------------------------

export async function resumeBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.body?.batchId) as string || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    await BatchStateMachine.resumeBatch(batchId);

    const batch = await BatchRepository.getById(batchId);
    res.status(200).json({ batchId, status: (batch as Record<string, unknown>)?.status ?? 'UNKNOWN' });
  } catch (err) {
    console.error('resumeBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else if (message.includes('not paused') || message.includes('Invalid batch transition')) res.status(409).json({ error: message });
    else res.status(500).json({ error: 'Failed to resume batch', details: message });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/cancel
// ---------------------------------------------------------------------------

export async function cancelBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.body?.batchId) as string || '').trim();
    const reason = typeof req.body?.reason === 'string' ? req.body.reason.slice(0, 500) : undefined;

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    await BatchStateMachine.cancelBatch(batchId, reason);
    res.status(200).json({ batchId, status: 'CANCELLED', reason });
  } catch (err) {
    console.error('cancelBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else if (message.includes('Invalid batch transition')) res.status(409).json({ error: message });
    else res.status(500).json({ error: 'Failed to cancel batch', details: message });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/checkAdvance
// Manually run checkAndAdvanceBatch to fix stuck batches (e.g. when all
// messages are delivered but status didn't transition to COMPLETE).
// ---------------------------------------------------------------------------

export async function checkAdvanceBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.body?.batchId) as string || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) { res.status(404).json({ error: `Batch ${batchId} not found` }); return; }

    await BatchStateMachine.checkAndAdvanceBatch(batchId);

    const updated = await BatchRepository.getById(batchId);
    res.status(200).json({
      batchId,
      status: (updated as Record<string, unknown>)?.status ?? 'UNKNOWN',
      message: 'Status check completed',
    });
  } catch (err) {
    console.error('checkAdvanceBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else res.status(500).json({ error: 'Failed to check/advance batch', details: message });
  }
}

// ---------------------------------------------------------------------------
// GET /batches/:batchId/logs
// ---------------------------------------------------------------------------

export async function getBatchLogs(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.query.batchId || (req as any).params?.batchId) as string || '').trim();
    const step = req.query.step as string | undefined;
    const limit = Math.min(parseInt(String(req.query.limit || 500), 10) || 500, 1000);

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const logs = await BatchLogRepository.getByBatchId(batchId, {
      limit,
      step: step as BatchLogRepository.BatchLogStep | undefined,
    });
    res.status(200).json({ data: logs, total: logs.length });
  } catch (err) {
    console.error('getBatchLogs error:', err);
    res.status(500).json({ error: 'Failed to get batch logs', details: err instanceof Error ? err.message : String(err) });
  }
}

// ---------------------------------------------------------------------------
// GET /batches/:batchId/errors
// ---------------------------------------------------------------------------

export async function getBatchErrors(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.query.batchId) as string || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const stage = req.query.stage as string | undefined;
    const retryable = req.query.retryable !== undefined ? req.query.retryable === 'true' : undefined;

    const errors = await BatchErrorRepository.getByBatch(batchId, { stage, isRetryable: retryable });
    res.status(200).json({ data: errors, total: errors.length });
  } catch (err) {
    console.error('getBatchErrors error:', err);
    res.status(500).json({ error: 'Failed to get batch errors', details: err instanceof Error ? err.message : String(err) });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/errors/retry
// ---------------------------------------------------------------------------

export async function retryBatchErrors(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.params.batchId || req.body?.batchId) as string || '').trim();
    const stage = typeof req.body?.stage === 'string' ? req.body.stage : undefined;

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    if (stage === 'MESSAGING') {
      const result = await DLQService.retryAllForBatch(batchId);
      res.status(200).json({ batchId, stage, ...result });
      return;
    }

    const retryableErrors = stage
      ? await BatchErrorRepository.getRetryableByBatchAndStage(batchId, stage)
      : await BatchErrorRepository.getByBatch(batchId, { isRetryable: true });

    res.status(200).json({ retriedCount: retryableErrors.length });
  } catch (err) {
    console.error('retryBatchErrors error:', err);
    res.status(500).json({ error: 'Failed to retry batch errors', details: err instanceof Error ? err.message : String(err) });
  }
}
