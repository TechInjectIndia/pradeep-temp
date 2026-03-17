import { Request, Response } from 'firebase-functions/v2/https';
import * as FailedMessageRepository from '../repositories/FailedMessageRepository';
import * as DLQService from '../services/DLQService';

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
    const retryable = req.query.retryable !== undefined
      ? req.query.retryable === 'true'
      : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
    const startAfter = req.query.startAfter as string | undefined;

    const filters: { batchId?: string; channel?: string; isRetryable?: boolean } = {};
    if (batchId) filters.batchId = batchId;
    if (channel) filters.channel = channel;
    if (retryable !== undefined) filters.isRetryable = retryable;

    const messages = await FailedMessageRepository.list(
      Object.keys(filters).length > 0 ? filters : undefined,
      limit,
      startAfter,
    );

    res.status(200).json({ messages, count: messages.length });
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
    const { messageIds, batchId } = req.body;

    // Either retry specific messages by ID, or all retryable for a batch
    if (messageIds && Array.isArray(messageIds) && messageIds.length > 0) {
      const result = await DLQService.retryFromDLQ(messageIds);
      res.status(200).json(result);
      return;
    }

    if (batchId && typeof batchId === 'string') {
      const result = await DLQService.retryAllForBatch(batchId);
      res.status(200).json({ batchId, ...result });
      return;
    }

    res.status(400).json({
      error: 'Either messageIds (array) or batchId (string) is required',
    });
  } catch (err) {
    console.error('retryDLQ error:', err);
    res.status(500).json({
      error: 'Failed to retry DLQ messages',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
