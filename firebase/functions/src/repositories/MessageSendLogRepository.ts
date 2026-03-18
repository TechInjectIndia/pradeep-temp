import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import {
  db,
  setDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'message_send_log';

export interface MessageSendLogEntry {
  teacherPhone?: string;
  teacherEmail?: string;
  teacherName?: string;
  teacherMasterId?: string;
  batchId: string;
  channel: 'whatsapp' | 'email';
  commLogId: string;
  attemptNumber: number;
  sentAt: Timestamp | string;
  status: 'sent' | 'delivered' | 'failed';
  externalMessageId?: string;
  error?: string;
  templateName?: string;
  linkCount?: number;
  /** Message body/content that was sent */
  messageBody?: string;
  /** Template params (WhatsApp) or subject (Email) */
  templateParams?: Record<string, string>;
  subject?: string;
}

/** Recursively strip undefined - Firestore rejects undefined anywhere */
function sanitizeForFirestore(obj: unknown): unknown {
  if (obj === undefined || obj === null) return null;
  if (Array.isArray(obj)) return obj.map(sanitizeForFirestore).filter((v) => v !== undefined);
  if (typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined) out[k] = sanitizeForFirestore(v);
    }
    return out;
  }
  return obj;
}

/**
 * Log every message send attempt (success or failure) for audit and frequency checks.
 */
export async function create(data: MessageSendLogEntry): Promise<string> {
  const docRef = db.collection(COLLECTION).doc();
  const now = FieldValue.serverTimestamp();

  const clean = sanitizeForFirestore(data) as Record<string, unknown>;
  await setDoc(COLLECTION, docRef.id, {
    ...clean,
    createdAt: now,
  });

  return docRef.id;
}

/**
 * Count messages sent to a phone number since a given timestamp.
 * Uses Firestore count aggregation for efficient queries.
 */
export async function countByTeacherPhoneSince(
  teacherPhone: string,
  since: Timestamp | Date,
): Promise<number> {
  const sinceTs = since instanceof Date ? Timestamp.fromDate(since) : since;
  const normalized = teacherPhone.replace(/\D/g, '');
  if (!normalized) return 0;

  const snap = await db
    .collection(COLLECTION)
    .where('teacherPhone', '==', normalized)
    .where('sentAt', '>=', sinceTs)
    .count()
    .get();

  return snap.data().count;
}

/**
 * Count messages sent to an email since a given timestamp.
 */
export async function countByTeacherEmailSince(
  teacherEmail: string,
  since: Timestamp | Date,
): Promise<number> {
  const sinceTs = since instanceof Date ? Timestamp.fromDate(since) : since;
  const normalized = (teacherEmail || '').toLowerCase().trim();
  if (!normalized) return 0;

  const snap = await db
    .collection(COLLECTION)
    .where('teacherEmail', '==', normalized)
    .where('sentAt', '>=', sinceTs)
    .count()
    .get();

  return snap.data().count;
}

/**
 * Get recent send logs for a teacher by phone (for audit / frequency analysis).
 */
export async function getByTeacherPhone(
  teacherPhone: string,
  limit = 50,
): Promise<Array<MessageSendLogEntry & { id: string }>> {
  const normalized = teacherPhone.replace(/\D/g, '');
  if (!normalized) return [];

  return queryDocs(COLLECTION, {
    filters: [{ field: 'teacherPhone', op: '==', value: normalized }],
    orderBy: { field: 'sentAt', direction: 'desc' },
    limit,
  }) as Promise<Array<MessageSendLogEntry & { id: string }>>;
}

/**
 * Get recent send logs for a teacher by email.
 */
export async function getByTeacherEmail(
  teacherEmail: string,
  limit = 50,
): Promise<Array<MessageSendLogEntry & { id: string }>> {
  const normalized = (teacherEmail || '').toLowerCase().trim();
  if (!normalized) return [];

  return queryDocs(COLLECTION, {
    filters: [{ field: 'teacherEmail', op: '==', value: normalized }],
    orderBy: { field: 'sentAt', direction: 'desc' },
    limit,
  }) as Promise<Array<MessageSendLogEntry & { id: string }>>;
}

/**
 * Get all send logs for a batch.
 */
export async function getByBatchId(
  batchId: string,
  limit = 500,
): Promise<Array<MessageSendLogEntry & { id: string }>> {
  return queryDocs(COLLECTION, {
    filters: [{ field: 'batchId', op: '==', value: batchId }],
    orderBy: { field: 'sentAt', direction: 'desc' },
    limit,
  }) as Promise<Array<MessageSendLogEntry & { id: string }>>;
}

/**
 * Get recent send logs (all or filtered by channel).
 */
export async function getRecent(
  options?: { limit?: number; channel?: 'whatsapp' | 'email'; batchId?: string },
): Promise<Array<MessageSendLogEntry & { id: string }>> {
  const limit = options?.limit ?? 300;
  const filters: Array<{ field: string; op: '==' ; value: unknown }> = [];
  if (options?.batchId) filters.push({ field: 'batchId', op: '==', value: options.batchId });
  if (options?.channel) filters.push({ field: 'channel', op: '==', value: options.channel });

  return queryDocs(COLLECTION, {
    filters: filters.length > 0 ? filters : undefined,
    orderBy: { field: 'sentAt', direction: 'desc' },
    limit,
  }) as Promise<Array<MessageSendLogEntry & { id: string }>>;
}

export interface ContactSummary {
  contact: string;
  channel: 'whatsapp' | 'email';
  count: number;
  batches: string[];
  teacherNames: string[];
  lastSentAt: string;
  messageBody?: string;
}

/**
 * Aggregate send logs by contact (phone or email).
 */
export function aggregateByContact(
  logs: Array<MessageSendLogEntry & { id: string }>,
): { byPhone: ContactSummary[]; byEmail: ContactSummary[] } {
  const phoneMap = new Map<string, { count: number; batches: Set<string>; teachers: Set<string>; lastSent: string; body?: string }>();
  const emailMap = new Map<string, { count: number; batches: Set<string>; teachers: Set<string>; lastSent: string; body?: string }>();

  for (const log of logs) {
    const sentAt = typeof log.sentAt === 'string' ? log.sentAt : (log.sentAt as Timestamp).toDate?.()?.toISOString?.() ?? String(log.sentAt);
    if (log.channel === 'whatsapp' && log.teacherPhone) {
      const key = log.teacherPhone;
      const existing = phoneMap.get(key);
      if (existing) {
        existing.count++;
        existing.batches.add(log.batchId);
        if (log.teacherName) existing.teachers.add(log.teacherName);
        if (sentAt > existing.lastSent) existing.lastSent = sentAt;
        if (log.messageBody) existing.body = log.messageBody;
      } else {
        phoneMap.set(key, {
          count: 1,
          batches: new Set([log.batchId]),
          teachers: new Set(log.teacherName ? [log.teacherName] : []),
          lastSent: sentAt,
          body: log.messageBody,
        });
      }
    } else if (log.channel === 'email' && log.teacherEmail) {
      const key = log.teacherEmail;
      const existing = emailMap.get(key);
      if (existing) {
        existing.count++;
        existing.batches.add(log.batchId);
        if (log.teacherName) existing.teachers.add(log.teacherName);
        if (sentAt > existing.lastSent) existing.lastSent = sentAt;
        if (log.messageBody) existing.body = log.messageBody;
      } else {
        emailMap.set(key, {
          count: 1,
          batches: new Set([log.batchId]),
          teachers: new Set(log.teacherName ? [log.teacherName] : []),
          lastSent: sentAt,
          body: log.messageBody,
        });
      }
    }
  }

  const byPhone: ContactSummary[] = Array.from(phoneMap.entries()).map(([contact, v]) => ({
    contact,
    channel: 'whatsapp',
    count: v.count,
    batches: Array.from(v.batches),
    teacherNames: Array.from(v.teachers),
    lastSentAt: v.lastSent,
    messageBody: v.body,
  }));

  const byEmail: ContactSummary[] = Array.from(emailMap.entries()).map(([contact, v]) => ({
    contact,
    channel: 'email',
    count: v.count,
    batches: Array.from(v.batches),
    teacherNames: Array.from(v.teachers),
    lastSentAt: v.lastSent,
    messageBody: v.body,
  }));

  return { byPhone, byEmail };
}
