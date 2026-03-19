import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchErrorRepository from '../repositories/BatchErrorRepository';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import * as OrderRepository from '../repositories/OrderRepository';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as DLQService from '../services/DLQService';
import * as TeacherService from '../services/TeacherService';
import * as SpecimenService from '../services/SpecimenService';
import * as MessagingService from '../services/MessagingService';

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
// POST /batchesRetryResolution
// Manually run teacher resolution for batches stuck in RESOLVING (e.g. when
// the Firestore trigger didn't fire in the emulator).
// ---------------------------------------------------------------------------

export async function retryResolution(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.body?.batchId as string) || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) { res.status(404).json({ error: `Batch ${batchId} not found` }); return; }

    const status = (batch as Record<string, unknown>).status as string;
    if (status !== 'RESOLVING') {
      res.status(409).json({
        error: `Batch must be in RESOLVING status (current: ${status})`,
        status,
      });
      return;
    }

    await TeacherService.resolveTeachersForBatch(batchId);
    await BatchStateMachine.checkAndAdvanceBatch(batchId);

    const updated = await BatchRepository.getById(batchId);
    res.status(200).json({
      batchId,
      status: (updated as Record<string, unknown>)?.status ?? 'UNKNOWN',
      message: 'Resolution completed',
    });
  } catch (err) {
    console.error('retryResolution error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else res.status(500).json({ error: 'Failed to retry resolution', details: message });
  }
}

// ---------------------------------------------------------------------------
// POST /batchesRetryOrderCreation
// Manually enqueue order creation tasks for batches stuck in ORDERING (e.g. when
// the Firestore trigger didn't fire in the emulator).
// ---------------------------------------------------------------------------

export async function retryOrderCreation(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.body?.batchId as string) || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) { res.status(404).json({ error: `Batch ${batchId} not found` }); return; }

    const status = (batch as Record<string, unknown>).status as string;
    if (status !== 'ORDERING' && status !== 'CREATING_ORDERS') {
      res.status(409).json({
        error: `Batch must be in ORDERING status (current: ${status})`,
        status,
      });
      return;
    }

    const result = await SpecimenService.createOrdersForBatch(batchId);

    res.status(200).json({
      batchId,
      batchStatus: status,
      totalTeachers: result.totalTeachers,
      resolvedTeachers: result.resolvedTeachers,
      skippedTeachers: result.skippedTeachers,
      ordersToCreate: result.ordersToCreate,
      message: `${result.ordersToCreate} order${result.ordersToCreate !== 1 ? 's' : ''} created via Order API`,
    });
  } catch (err) {
    console.error('retryOrderCreation error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else res.status(500).json({ error: 'Failed to retry order creation', details: message });
  }
}

// ---------------------------------------------------------------------------
// POST /batchesRetryDispatching
// Manually enqueue messaging tasks for batches stuck in MESSAGING (e.g. when
// the onAggregationComplete Firestore trigger didn't fire in the emulator).
// ---------------------------------------------------------------------------

export async function retryDispatching(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.body?.batchId as string) || '').trim();

    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) { res.status(404).json({ error: `Batch ${batchId} not found` }); return; }

    const status = (batch as Record<string, unknown>).status as string;
    const allowedStatuses = ['MESSAGING', 'DISPATCHING'];
    if (!allowedStatuses.includes(status)) {
      res.status(409).json({
        error: `Batch must be in MESSAGING or DISPATCHING status (current: ${status})`,
        status,
      });
      return;
    }

    const result = await MessagingService.enqueueMessagesForBatch(batchId);

    res.status(200).json({
      batchId,
      totalMessages: result.totalMessages,
      message: `Enqueued ${result.totalMessages} messaging tasks`,
    });
  } catch (err) {
    console.error('retryDispatching error:', err);
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('not found')) res.status(404).json({ error: message });
    else res.status(500).json({ error: 'Failed to retry dispatching', details: message });
  }
}

// ---------------------------------------------------------------------------
// GET /batchesTeachers?batchId=xxx — teachers with orders (or pending books)
// Returns teachers from raw records; orders with links when created, else pending books
// ---------------------------------------------------------------------------

function parseBooksString(books: string): string[] {
  if (!books || typeof books !== 'string') return [];
  return books.split(/[,;]/).map((b) => b.trim()).filter(Boolean);
}

export async function getBatchTeachers(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') { res.status(405).json({ error: 'Method not allowed' }); return; }

  try {
    const batchId = ((req.query.batchId || (req as any).params?.batchId) as string || '').trim();
    if (!batchId || !isValidId(batchId)) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const [orders, rawTeachers] = await Promise.all([
      OrderRepository.getByBatchId(batchId),
      TeacherRawRepository.getByBatchId(batchId),
    ]);

    const orderByTeacher = new Map<string, Record<string, unknown>>();
    for (const o of orders as Record<string, unknown>[]) {
      const tid = (o.teacherRecordId as string) || (o as { id?: string }).id;
      if (tid) orderByTeacher.set(tid, o);
    }

    const data = (rawTeachers as Record<string, unknown>[]).map((r) => {
      const teacherRecordId = (r.id as string) || (r.teacherRecordId as string) || '';
      const order = orderByTeacher.get(teacherRecordId) as Record<string, unknown> | undefined;
      const booksFromOrder = (order?.books as Array<{ title?: string; productId?: string; specimenUrl?: string; expiresAt?: string }>) || [];
      const booksFromRaw = parseBooksString((r.books as string) || '');

      let ordersList: Array<{ productId: string; title: string; link: string; expiresAt: string; status: 'created' | 'pending' }>;
      if (booksFromOrder.length > 0) {
        ordersList = booksFromOrder.map((b) => ({
          productId: (b.productId as string) || '',
          title: (b.title as string) || (b.productId as string) || '—',
          link: (b.specimenUrl as string) || '',
          expiresAt: (b.expiresAt as string) || '',
          status: 'created' as const,
        }));
      } else {
        ordersList = booksFromRaw.map((title) => ({
          productId: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          title,
          link: '',
          expiresAt: '',
          status: 'pending' as const,
        }));
      }

      return {
        teacherRecordId,
        teacherName: (order?.teacherName as string) || (r.name as string) || '—',
        teacherPhone: (order?.teacherPhone as string) || (r.phone as string) || '—',
        teacherEmail: (order?.teacherEmail as string) || (r.email as string) || '—',
        orders: ordersList,
      };
    });

    res.status(200).json({ data, total: data.length });
  } catch (err) {
    console.error('getBatchTeachers error:', err);
    res.status(500).json({ error: 'Failed to get batch teachers', details: err instanceof Error ? err.message : String(err) });
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
