import * as crypto from 'crypto';
import * as admin from 'firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { db } from '../infrastructure/firestore/FirestoreAdapter';
import * as AggregationRepository from '../repositories/AggregationRepository';
import * as CommLogRepository from '../repositories/CommLogRepository';
import * as CommunicationRepository from '../repositories/CommunicationRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import * as MessageSendLogRepository from '../repositories/MessageSendLogRepository';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import { AdapterRegistry } from '../adapters/AdapterRegistry';
import { config } from '../config';
import { WHATSAPP_QUEUE, EMAIL_QUEUE } from '../constants/queues';

function normalizePhoneForStorage(phone: string): string {
  return (phone || '').replace(/\D/g, '');
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WhatsAppPayload {
  phone: string;
  templateName: string;
  params: Record<string, string>;
}

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read completed aggregations for a batch, create comm_log entries, and
 * enqueue Cloud Tasks. Uses messageHash as the deterministic comm_log ID
 * to prevent duplicate messages under concurrent calls.
 */
export async function enqueueMessagesForBatch(batchId: string): Promise<{ totalMessages: number }> {
  const [aggregations, batch] = await Promise.all([
    AggregationRepository.getCompleteByBatchId(batchId),
    BatchRepository.getById(batchId),
  ]);

  if (aggregations.length === 0 || !batch) {
    return { totalMessages: 0 };
  }

  // Teacher details are now denormalized onto the aggregation document by
  // SpecimenService.processOrderCreation — no raw teacher fetch needed.
  let totalMessages = 0;
  const logLevel = process.env.LOG_LEVEL || 'info';

  const CHUNK = 20;
  for (let i = 0; i < aggregations.length; i += CHUNK) {
    const chunk = aggregations.slice(i, i + CHUNK);

    const results = await Promise.allSettled(
      chunk.map(async (aggregation) => {
        const agg = aggregation as any;

        // Read teacher details directly from the aggregation doc (denormalized)
        const teacherPhone: string = normalizePhoneForStorage(agg.teacherPhone || '');
        const teacherEmail: string = (agg.teacherEmail || '').toLowerCase().trim();
        const teacherName: string = agg.teacherName || '';
        const books: string = agg.books || '';

        // Channel preferences — stored on aggregation by order creation
        let sendWhatsApp: boolean = agg.sendWhatsApp === true;
        let sendEmail: boolean = agg.sendEmail === true;
        // Backward compat: if aggregation predates channel fields, default both
        if (agg.sendWhatsApp === undefined && agg.sendEmail === undefined) {
          sendWhatsApp = true;
          sendEmail = true;
        }

        const channelsToSend: Array<'whatsapp' | 'email'> = [];
        if (teacherPhone && sendWhatsApp) channelsToSend.push('whatsapp');
        if (teacherEmail && sendEmail) channelsToSend.push('email');

        if (channelsToSend.length === 0 && logLevel === 'debug') {
          console.log(`enqueueMessagesForBatch: skip ${teacherName || 'teacher'} (phone=${!!teacherPhone} sendWA=${sendWhatsApp} sendEmail=${sendEmail})`);
        }

        for (const ch of channelsToSend) {
          const contact = ch === 'whatsapp' ? teacherPhone : teacherEmail;
          const messageHash = generateMessageHash(contact, batchId, ch);
          const commLogRef = db.collection('comm_log').doc(messageHash);

          let commLogId: string | null = null;

          // Build message body for logging (before transaction)
          let messageBody = '';
          let templateParams: Record<string, string> | undefined;
          let subject: string | undefined;
          if (ch === 'whatsapp') {
            const wp = buildWhatsAppPayload(teacherPhone, books, batchId, teacherName);
            messageBody = `Template: ${wp.templateName}, Params: ${JSON.stringify(wp.params)}`;
            templateParams = wp.params;
          } else {
            const ep = buildEmailPayload(teacherEmail, books, batchId);
            messageBody = `Subject: ${ep.subject}`;
            subject = ep.subject;
          }

          await db.runTransaction(async (tx) => {
            const snap = await tx.get(commLogRef);
            if (snap.exists) {
              commLogId = null;
              return;
            }

            const now = FieldValue.serverTimestamp();
            const commLogData: Record<string, unknown> = {
              batchId,
              teacherMasterId: agg.teacherMasterId,
              teacherRecordId: agg.teacherRecordId,
              aggregationKey: aggregation.id,
              channel: ch,
              teacherPhone,
              teacherEmail,
              teacherName,
              books,
              messageHash,
              messageBody,
              status: 'queued',
              attemptCount: 0,
              createdAt: now,
              updatedAt: now,
            };
            if (templateParams != null) commLogData.templateParams = templateParams;
            if (subject != null) commLogData.subject = subject;
            tx.set(commLogRef, commLogData);
            commLogId = messageHash;
          });

          if (!commLogId) continue;

          // Outbox log: message queued
          BatchLogRepository.append(batchId, {
            step: 'outbox_queued',
            message: `Message queued to ${ch === 'whatsapp' ? teacherPhone : teacherEmail}`,
            detail: `${teacherName} | ${ch}`,
            teacherName,
            teacherPhone: ch === 'whatsapp' ? teacherPhone : undefined,
            teacherEmail: ch === 'email' ? teacherEmail : undefined,
            channel: ch as 'whatsapp' | 'email',
            messageBody,
            templateParams,
            subject,
            metadata: { books, messageHash: commLogId },
          }).catch((e) => console.error('BatchLog append failed:', e));

          const queueName = ch === 'email' ? EMAIL_QUEUE : WHATSAPP_QUEUE;
          await AdapterRegistry.getInstance().taskQueue.enqueueTask(queueName, {
            messageId: commLogId,
            teacherPhone,
            teacherEmail,
            teacherName,
            books,
            batchId,
            channel: ch,
            attemptNumber: 1,
          });

          totalMessages++;
        }
      }),
    );

    // Log any failures without stopping the batch
    results.forEach((r, idx) => {
      if (r.status === 'rejected') {
        console.error(`enqueueMessagesForBatch: chunk item ${i + idx} failed:`, r.reason);
      }
    });
  }

  if (totalMessages > 0) {
    await BatchRepository.incrementStat(batchId, 'stats.messagesQueued', totalMessages);
  }

  return { totalMessages };
}

/**
 * Cloud Task worker handler — sends a single message.
 * Steps: idempotency check → batch status check → send → update records.
 */
export async function processMessageTask(
  messageId: string,
  teacherPhone: string,
  payload: any,
  attemptNumber: number,
): Promise<void> {
  const commLog = await CommLogRepository.getById(messageId);
  if (!commLog) throw new Error(`Comm log ${messageId} not found`);

  const log = commLog as any;

  // Idempotency: skip if already delivered or in DLQ
  if (log.status === 'delivered' || log.status === 'dlq') {
    console.log(`Message ${messageId} already in status ${log.status}, skipping`);
    return;
  }

  // Batch status check
  const batchId: string = log.batchId;
  const batch = await BatchRepository.getById(batchId);
  if (!batch) throw new Error(`Batch ${batchId} not found`);

  const batchStatus: string = (batch as any).status;
  if (batchStatus === 'CANCELLED' || batchStatus === 'PAUSED') {
    console.log(`Batch ${batchId} is ${batchStatus}, skipping message ${messageId}`);
    await CommLogRepository.update(messageId, {
      status: 'skipped',
      skipReason: `batch_${batchStatus.toLowerCase()}`,
    });
    return;
  }

  const channel: string = log.channel || 'whatsapp';
  const books: string = log.books || payload.books || '';
  const teacherEmail: string = log.teacherEmail || payload.teacherEmail || '';
  const phone = teacherPhone || log.teacherPhone || '';
  const phoneNormalized = normalizePhoneForStorage(phone);
  const teacherName: string = log.teacherName || payload.teacherName || '';

  const maxPerHour = config.app.maxMessagesPerTeacherPerHour || 0;
  if (maxPerHour > 0) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const count =
      channel === 'email'
        ? await MessageSendLogRepository.countByTeacherEmailSince(teacherEmail, oneHourAgo)
        : await MessageSendLogRepository.countByTeacherPhoneSince(phoneNormalized, oneHourAgo);
    if (count >= maxPerHour) {
      throw new Error(
        `Frequency limit: teacher has received ${count} messages in the last hour (max ${maxPerHour})`,
      );
    }
  }

  const sentAt = Timestamp.now();
  const templateName = channel === 'whatsapp' ? (config.wati.templateName || 'specimen_links') : 'email';

  // Build payload and message body for logging
  let messageBody = '';
  let templateParams: Record<string, string> | undefined;
  let subject: string | undefined;
  if (channel === 'email') {
    const ep = buildEmailPayload(teacherEmail, books, batchId);
    messageBody = `Subject: ${ep.subject} | Body length: ${ep.html.length} chars`;
    subject = ep.subject;
  } else {
    const wp = buildWhatsAppPayload(phone, books, batchId, teacherName);
    messageBody = `Template: ${wp.templateName} | Params: ${JSON.stringify(wp.params)}`;
    templateParams = wp.params;
  }

  try {
    let externalMessageId: string;

    if (channel === 'email') {
      const emailPayload: EmailPayload = buildEmailPayload(teacherEmail, books, batchId);
      const result = await AdapterRegistry.getInstance().email.sendEmail(
        teacherEmail,
        emailPayload.subject,
        emailPayload.html,
      );
      externalMessageId = result.messageId;
    } else {
      const whatsappPayload: WhatsAppPayload = buildWhatsAppPayload(phone, books, batchId, teacherName);
      const result = await AdapterRegistry.getInstance().messaging.sendTemplate(
        phone,
        whatsappPayload.templateName,
        whatsappPayload.params,
      );
      externalMessageId = result.messageId;
    }

    const sentAtIso = new Date().toISOString();

    // Update comm_log, create teacher_communication, log send, and batch log
    await Promise.all([
      CommLogRepository.update(messageId, {
        status: 'delivered',
        externalMessageId,
        attemptCount: attemptNumber,
        deliveredAt: sentAtIso,
      }),
      CommunicationRepository.create({
        teacherId: log.teacherMasterId,
        batchId,
        channel,
        externalMessageId,
        deliveryStatus: 'delivered',
        commLogId: messageId,
      }),
      BatchRepository.incrementStat(batchId, 'stats.messagesDelivered', 1).then(() =>
        BatchStateMachine.checkAndAdvanceBatch(batchId),
      ),
      MessageSendLogRepository.create({
        teacherPhone: phoneNormalized || undefined,
        teacherEmail: teacherEmail || undefined,
        teacherName: teacherName || undefined,
        teacherMasterId: log.teacherMasterId,
        batchId,
        channel: channel as 'whatsapp' | 'email',
        commLogId: messageId,
        attemptNumber,
        sentAt,
        status: 'delivered',
        externalMessageId,
        templateName,
        linkCount: 0,
        messageBody,
        templateParams,
        subject,
      }).catch((e) => console.error('MessageSendLog.create failed:', e?.message || e, 'batchId:', batchId, 'channel:', channel)),
      BatchLogRepository.append(batchId, {
        step: 'message_delivered',
        message: `Delivered to ${teacherName || 'teacher'} via ${channel}`,
        detail: `Contact: ${channel === 'whatsapp' ? phone : teacherEmail} at ${sentAtIso}`,
        teacherName,
        teacherPhone: channel === 'whatsapp' ? phone : undefined,
        teacherEmail: channel === 'email' ? teacherEmail : undefined,
        channel: channel as 'whatsapp' | 'email',
        messageBody,
        templateParams,
        subject,
        metadata: { externalMessageId, commLogId: messageId },
      }),
    ]);
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    await Promise.all([
      CommLogRepository.update(messageId, {
        status: 'failed',
        attemptCount: attemptNumber,
        lastError: errMsg,
        lastAttemptAt: new Date().toISOString(),
      }),
      MessageSendLogRepository.create({
        teacherPhone: phoneNormalized || undefined,
        teacherEmail: teacherEmail || undefined,
        teacherName: teacherName || undefined,
        teacherMasterId: log.teacherMasterId,
        batchId,
        channel: channel as 'whatsapp' | 'email',
        commLogId: messageId,
        attemptNumber,
        sentAt,
        status: 'failed',
        error: errMsg,
        templateName,
        linkCount: 0,
        messageBody,
        templateParams,
        subject,
      }).catch((e) => console.error('MessageSendLog.create (failed) error:', e?.message || e, 'batchId:', batchId, 'channel:', channel)),
      BatchLogRepository.append(batchId, {
        step: 'message_failed',
        message: `Failed to send to ${teacherName || 'teacher'} via ${channel}`,
        detail: errMsg,
        teacherName,
        teacherPhone: channel === 'whatsapp' ? phone : undefined,
        teacherEmail: channel === 'email' ? teacherEmail : undefined,
        channel: channel as 'whatsapp' | 'email',
        messageBody,
        templateParams,
        subject,
        metadata: { error: errMsg, commLogId: messageId },
      }),
    ]);
    throw err;
  }
}

/**
 * Generate a SHA-256 hash for message idempotency.
 * Includes channel so we can send to both WhatsApp and Email per teacher.
 */
export function generateMessageHash(
  contact: string,
  batchId: string,
  channel: string,
): string {
  const input = `${contact}:${batchId}:${channel}`;
  return crypto.createHash('sha256').update(input).digest('hex');
}

const WEBSITE_URL = config.app.websiteUrl || 'https://www.pradeeppublications.com';

export function buildWhatsAppPayload(
  teacherPhone: string,
  books: string,
  batchId: string,
  teacherName?: string,
): WhatsAppPayload {
  const templateName = config.wati.templateName || 'specimen_books_msg';
  // specimen_books_msg uses {{1}}, {{2}}, {{3}} - pass by index
  const params: Record<string, string> = {
    '1': teacherName || 'Teacher',
    '2': books || 'N/A',
    '3': WEBSITE_URL,
  };
  return {
    phone: teacherPhone,
    templateName,
    params,
  };
}

export function buildEmailPayload(teacherEmail: string, books: string, batchId: string): EmailPayload {
  const booksList = (books || 'N/A').split(/[,;]/).map((b) => b.trim()).filter(Boolean);
  const booksHtml = booksList.length > 0
    ? `<ul>${booksList.map((b) => `<li>${b}</li>`).join('')}</ul>`
    : '<p>N/A</p>';

  return {
    to: teacherEmail,
    subject: `Your Books - Pradeep Publications`,
    html: `
      <h2>Your Books</h2>
      <p>Here are the books for your reference:</p>
      ${booksHtml}
      <p><strong>Visit:</strong> <a href="${WEBSITE_URL}">${WEBSITE_URL}</a></p>
    `.trim(),
  };
}
