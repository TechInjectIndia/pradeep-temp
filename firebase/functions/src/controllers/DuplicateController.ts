import { Request, Response } from 'firebase-functions/v2/https';
import * as DuplicateService from '../services/DuplicateService';

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
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const startAfter = req.query.startAfter as string | undefined;

    const filters: { batchId?: string; resolution?: string } = {};
    if (batchId) filters.batchId = batchId;
    if (resolution) filters.resolution = resolution;

    const duplicates = await DuplicateService.listDuplicates(
      Object.keys(filters).length > 0 ? filters : undefined,
      limit,
      startAfter,
    );

    res.status(200).json({ duplicates, count: duplicates.length });
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

    if (!reviewedBy || typeof reviewedBy !== 'string') {
      res.status(400).json({ error: 'reviewedBy is required' });
      return;
    }

    await DuplicateService.resolveDuplicate(duplicateId, action, reviewedBy);

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
