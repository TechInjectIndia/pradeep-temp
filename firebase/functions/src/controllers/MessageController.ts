import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as CommLogRepository from '../repositories/CommLogRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';

const WHATSAPP_QUEUE = 'whatsapp-messages';
const EMAIL_QUEUE = 'email-messages';

// ---------------------------------------------------------------------------
// POST /messages/resend
// ---------------------------------------------------------------------------

export async function resendMessage(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { messageId } = req.body;

    if (!messageId || typeof messageId !== 'string') {
      res.status(400).json({ error: 'messageId is required' });
      return;
    }

    const commLog = await CommLogRepository.getById(messageId);
    if (!commLog) {
      res.status(404).json({ error: `Message ${messageId} not found` });
      return;
    }

    const log = commLog as any;

    // Only allow resend for failed or dlq messages
    if (log.status !== 'failed' && log.status !== 'dlq') {
      res.status(409).json({
        error: `Message is in status "${log.status}" and cannot be resent. Only failed or dlq messages can be resent.`,
      });
      return;
    }

    const channel: string = log.channel || 'whatsapp';
    const queueName = channel === 'email' ? EMAIL_QUEUE : WHATSAPP_QUEUE;

    const payload = {
      messageId: log.id,
      teacherPhone: log.teacherPhone,
      teacherEmail: log.teacherEmail,
      batchId: log.batchId,
      channel,
      attemptNumber: (log.attemptCount || 0) + 1,
      isRetry: true,
    };

    await AdapterRegistry.getInstance().taskQueue.enqueueTask(queueName, payload);

    // Update comm_log status back to queued
    await CommLogRepository.update(messageId, {
      status: 'queued',
      retriedAt: new Date().toISOString(),
    });

    res.status(200).json({
      messageId,
      status: 'queued',
      message: 'Message re-enqueued for delivery',
    });
  } catch (err) {
    console.error('resendMessage error:', err);
    res.status(500).json({
      error: 'Failed to resend message',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
