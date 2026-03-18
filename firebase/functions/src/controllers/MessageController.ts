import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as CommLogRepository from '../repositories/CommLogRepository';
import * as MessageSendLogRepository from '../repositories/MessageSendLogRepository';
import * as AggregationRepository from '../repositories/AggregationRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';

/** Map comm_log entry to message log format (fallback when message_send_log is empty) */
function commLogToMessageLog(c: any): Record<string, unknown> {
  return {
    id: c.id,
    batchId: c.batchId,
    teacherName: c.teacherName,
    teacherPhone: c.teacherPhone,
    teacherEmail: c.teacherEmail,
    channel: c.channel || 'whatsapp',
    status: c.status === 'delivered' ? 'delivered' : c.status === 'failed' ? 'failed' : 'sent',
    sentAt: c.deliveredAt || c.createdAt,
    messageBody: c.messageBody,
    subject: c.subject,
  };
}

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

    let books = log.books || '';
    if (!books && log.aggregationKey) {
      const agg = await AggregationRepository.getById(log.aggregationKey);
      if (agg) books = (agg as any).books || '';
    }

    const payload = {
      messageId: log.id,
      teacherPhone: log.teacherPhone,
      teacherEmail: log.teacherEmail,
      teacherName: log.teacherName,
      books,
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

// ---------------------------------------------------------------------------
// GET /messages/logs — query message send logs (batch, teacher, frequency)
// ---------------------------------------------------------------------------

export async function listMessageLogs(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = req.query.batchId as string | undefined;
    const teacherPhone = req.query.teacherPhone as string | undefined;
    const teacherEmail = req.query.teacherEmail as string | undefined;
    const channel = req.query.channel as 'whatsapp' | 'email' | undefined;
    const limit = Math.min(parseInt(req.query.limit as string, 10) || 100, 500);

    if (batchId) {
      let logs = await MessageSendLogRepository.getByBatchId(batchId, limit);
      if (logs.length === 0) {
        const commLogs = await CommLogRepository.getByBatchId(batchId);
        logs = commLogs
          .filter((c: any) => c.status && c.status !== 'skipped' && c.status !== 'dlq')
          .map((c: any) => ({ ...commLogToMessageLog(c), id: c.id })) as any;
      }
      const summary = MessageSendLogRepository.aggregateByContact(logs);
      res.status(200).json({ data: logs, total: logs.length, summary });
      return;
    }

    if (teacherPhone) {
      const logs = await MessageSendLogRepository.getByTeacherPhone(teacherPhone, limit);
      res.status(200).json({ data: logs, total: logs.length });
      return;
    }

    if (teacherEmail) {
      const logs = await MessageSendLogRepository.getByTeacherEmail(teacherEmail, limit);
      res.status(200).json({ data: logs, total: logs.length });
      return;
    }

    // No filter: return recent logs with summary
    const logs = await MessageSendLogRepository.getRecent({ limit, channel });
    const summary = MessageSendLogRepository.aggregateByContact(logs);
    res.status(200).json({ data: logs, total: logs.length, summary });
  } catch (err) {
    console.error('listMessageLogs error:', err);
    res.status(500).json({
      error: 'Failed to list message logs',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
