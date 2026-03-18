import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as DuplicateService from '../services/DuplicateService';
import * as DuplicateRepository from '../repositories/DuplicateRepository';

const MAX_PAGE_SIZE = 100;

function parseSafeInt(value: unknown, defaultVal: number, max: number): number {
  const n = typeof value === 'string' ? parseInt(value, 10) : defaultVal;
  if (isNaN(n) || n < 1) return defaultVal;
  return Math.min(n, max);
}

// ---------------------------------------------------------------------------
// GET /duplicates
// ---------------------------------------------------------------------------

export async function listDuplicates(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.query.batchId as string | undefined;
    const resolution = req.query.resolution as string | undefined;
    const pageSize = parseSafeInt(req.query.pageSize, 20, MAX_PAGE_SIZE);
    const page = parseSafeInt(req.query.page, 1, 100_000);
    const offset = (page - 1) * pageSize;

    const filters: { batchId?: string; resolution?: string } = {};
    if (batchId) filters.batchId = batchId;
    if (resolution) filters.resolution = resolution;

    const hasFilters = Object.keys(filters).length > 0;

    const [data, total] = await Promise.all([
      DuplicateService.listDuplicates(hasFilters ? filters : undefined, pageSize, offset),
      DuplicateRepository.count(hasFilters ? filters : undefined),
    ]);

    res.status(200).json({
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('listDuplicates error:', err);
    res.status(500).json({
      error: 'Failed to list duplicates',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /duplicates/resolve
// ---------------------------------------------------------------------------

export async function resolveDuplicate(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { duplicateId, action, reviewedBy } = req.body;

    if (!duplicateId || typeof duplicateId !== 'string') {
      res.status(400).json({ error: 'duplicateId is required' });
      return;
    }

    if (!action || (action !== 'merge' && action !== 'keep_separate')) {
      res.status(400).json({ error: 'action must be "merge" or "keep_separate"' });
      return;
    }

    // reviewedBy is optional — defaults to 'admin' if not provided
    const reviewer = typeof reviewedBy === 'string' && reviewedBy.trim() ? reviewedBy.trim() : 'admin';

    await DuplicateService.resolveDuplicate(duplicateId, action, reviewer);

    res.status(200).json({
      duplicateId,
      resolution: action === 'merge' ? 'merged' : 'kept_separate',
    });
  } catch (err) {
    console.error('resolveDuplicate error:', err);
    const message = err instanceof Error ? err.message : String(err);

    if (message.includes('not found')) {
      res.status(404).json({ error: message });
    } else if (message.includes('already been resolved')) {
      res.status(409).json({ error: message });
    } else {
      res.status(500).json({ error: 'Failed to resolve duplicate', details: message });
    }
  }
}
