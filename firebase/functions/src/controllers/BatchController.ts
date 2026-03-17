import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchErrorRepository from '../repositories/BatchErrorRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as DLQService from '../services/DLQService';

// ---------------------------------------------------------------------------
// GET /batches
// ---------------------------------------------------------------------------

export async function listBatches(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const status = req.query.status as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const startAfter = req.query.startAfter as string | undefined;

    const batches = await BatchRepository.list(status ? { status } : undefined, limit, startAfter);

    res.status(200).json({ batches, count: batches.length });
  } catch (err) {
    console.error('listBatches error:', err);
    res.status(500).json({
      error: 'Failed to list batches',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// GET /batches/:batchId
// ---------------------------------------------------------------------------

export async function getBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = (req.params.batchId || req.query.batchId) as string;

    if (!batchId) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) {
      res.status(404).json({ error: `Batch ${batchId} not found` });
      return;
    }

    res.status(200).json({ batch });
  } catch (err) {
    console.error('getBatch error:', err);
    res.status(500).json({
      error: 'Failed to get batch',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/pause
// ---------------------------------------------------------------------------

export async function pauseBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.params.batchId || req.body.batchId;

    if (!batchId) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    await BatchStateMachine.pauseBatch(batchId);

    res.status(200).json({ batchId, status: 'PAUSED' });
  } catch (err) {
    console.error('pauseBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes('not found')) {
      res.status(404).json({ error: message });
    } else if (message.includes('Invalid batch transition')) {
      res.status(409).json({ error: message });
    } else {
      res.status(500).json({ error: 'Failed to pause batch', details: message });
    }
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/resume
// ---------------------------------------------------------------------------

export async function resumeBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.params.batchId || req.body.batchId;

    if (!batchId) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    await BatchStateMachine.resumeBatch(batchId);

    const batch = await BatchRepository.getById(batchId);
    const currentStatus = batch ? (batch as any).status : 'UNKNOWN';

    res.status(200).json({ batchId, status: currentStatus });
  } catch (err) {
    console.error('resumeBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes('not found')) {
      res.status(404).json({ error: message });
    } else if (message.includes('not paused') || message.includes('Invalid batch transition')) {
      res.status(409).json({ error: message });
    } else {
      res.status(500).json({ error: 'Failed to resume batch', details: message });
    }
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/cancel
// ---------------------------------------------------------------------------

export async function cancelBatch(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.params.batchId || req.body.batchId;
    const reason = req.body.reason as string | undefined;

    if (!batchId) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    await BatchStateMachine.cancelBatch(batchId, reason);

    res.status(200).json({ batchId, status: 'CANCELLED', reason });
  } catch (err) {
    console.error('cancelBatch error:', err);
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes('not found')) {
      res.status(404).json({ error: message });
    } else if (message.includes('Invalid batch transition')) {
      res.status(409).json({ error: message });
    } else {
      res.status(500).json({ error: 'Failed to cancel batch', details: message });
    }
  }
}

// ---------------------------------------------------------------------------
// GET /batches/:batchId/errors
// ---------------------------------------------------------------------------

export async function getBatchErrors(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = (req.params.batchId || req.query.batchId) as string;

    if (!batchId) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const stage = req.query.stage as string | undefined;
    const retryable =
      req.query.retryable !== undefined ? req.query.retryable === 'true' : undefined;

    const errors = await BatchErrorRepository.getByBatch(batchId, {
      stage,
      isRetryable: retryable,
    });

    res.status(200).json({ errors, count: errors.length });
  } catch (err) {
    console.error('getBatchErrors error:', err);
    res.status(500).json({
      error: 'Failed to get batch errors',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /batches/:batchId/errors/retry
// ---------------------------------------------------------------------------

export async function retryBatchErrors(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.params.batchId || req.body.batchId;
    const stage = req.body.stage as string | undefined;

    if (!batchId) {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    // If the stage is MESSAGING, delegate to DLQService
    if (stage === 'MESSAGING') {
      const result = await DLQService.retryAllForBatch(batchId);
      res.status(200).json({ batchId, stage, ...result });
      return;
    }

    // For other stages, get retryable errors and return info
    const retryableErrors = stage
      ? await BatchErrorRepository.getRetryableByBatchAndStage(batchId, stage)
      : await BatchErrorRepository.getByBatch(batchId, { isRetryable: true });

    res.status(200).json({
      batchId,
      stage,
      retryableCount: retryableErrors.length,
      message:
        'Retryable errors identified. Specific retry logic per stage is handled by the corresponding service.',
    });
  } catch (err) {
    console.error('retryBatchErrors error:', err);
    res.status(500).json({
      error: 'Failed to retry batch errors',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
