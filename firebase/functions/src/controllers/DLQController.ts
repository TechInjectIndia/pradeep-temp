import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as FailedMessageRepository from '../repositories/FailedMessageRepository';
import * as DLQService from '../services/DLQService';

const MAX_PAGE_SIZE = 100;

function parseSafeInt(value: unknown, defaultVal: number, max: number): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : defaultVal;
  if (isNaN(n) || n < 1) return defaultVal;
  return Math.min(n, max);
}

// ---------------------------------------------------------------------------
// GET /dlq
// ---------------------------------------------------------------------------

export async function listDLQ(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.query.batchId as string | undefined;
    const channel = req.query.channel as string | undefined;
    const retryableOnly = req.query.retryableOnly === 'true' ? true : undefined;
    const pageSize = parseSafeInt(req.query.pageSize, 20, MAX_PAGE_SIZE);
    const page = parseSafeInt(req.query.page, 1, 100_000);
    const offset = (page - 1) * pageSize;

    const filters: { batchId?: string; channel?: string; isRetryable?: boolean } = {};
    if (batchId) filters.batchId = batchId;
    if (channel) filters.channel = channel;
    if (retryableOnly !== undefined) filters.isRetryable = retryableOnly;

    const hasFilters = Object.keys(filters).length > 0;

    const [data, total] = await Promise.all([
      FailedMessageRepository.list(hasFilters ? filters : undefined, pageSize, undefined, offset),
      FailedMessageRepository.count(hasFilters ? filters : undefined),
    ]);

    res.status(200).json({
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('listDLQ error:', err);
    res.status(500).json({
      error: 'Failed to list DLQ messages',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /dlq/retry
// ---------------------------------------------------------------------------

export async function retryDLQ(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { ids, retryAll } = req.body;

    let result: { enqueued: number; skipped: number };

    if (retryAll === true) {
      result = await DLQService.retryAll();
    } else if (Array.isArray(ids) && ids.length > 0) {
      const safeIds = ids.filter((id) => typeof id === 'string' && id.length <= 128);
      result = await DLQService.retryFromDLQ(safeIds);
    } else {
      res.status(400).json({ error: 'Provide ids (string[]) or retryAll (true)' });
      return;
    }

    res.status(200).json({ retriedCount: result.enqueued, skippedCount: result.skipped });
  } catch (err) {
    console.error('retryDLQ error:', err);
    res.status(500).json({
      error: 'Failed to retry DLQ messages',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
