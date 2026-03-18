import { FieldValue } from 'firebase-admin/firestore';
import { db, setDoc, queryDocs } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'batch_logs';

export type BatchLogStep =
  | 'upload'
  | 'resolution'
  | 'resolution_teacher'
  | 'ordering'
  | 'ordering_order_created'
  | 'aggregation'
  | 'aggregation_complete'
  | 'outbox_queued'
  | 'message_sent'
  | 'message_delivered'
  | 'message_failed'
  | 'batch_advanced'
  | 'batch_paused'
  | 'batch_resumed'
  | 'batch_cancelled'
  | 'error';

export interface BatchLogEntry {
  step: BatchLogStep;
  message: string;
  detail?: string;
  metadata?: Record<string, unknown>;
  /** For message logs */
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  channel?: 'whatsapp' | 'email';
  /** Message body/content sent */
  messageBody?: string;
  /** For WhatsApp: template params; for Email: subject */
  templateParams?: Record<string, string>;
  subject?: string;
  /** Timestamp (ISO string) */
  timestamp: string;
}

/** Strip undefined values - Firestore rejects undefined */
function sanitizeForFirestore(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

/**
 * Append a log entry for a batch.
 */
export async function append(
  batchId: string,
  entry: Omit<BatchLogEntry, 'timestamp'>,
): Promise<string> {
  const docRef = db.collection(COLLECTION).doc();
  const now = new Date().toISOString();
  const clean = sanitizeForFirestore({ batchId, ...entry } as unknown as Record<string, unknown>);
  const logData = {
    ...clean,
    timestamp: now,
    createdAt: FieldValue.serverTimestamp(),
  };
  await setDoc(COLLECTION, docRef.id, logData);
  return docRef.id;
}

/**
 * Get all logs for a batch, ordered by timestamp desc.
 */
export async function getByBatchId(
  batchId: string,
  options?: { limit?: number; step?: BatchLogStep },
): Promise<Array<BatchLogEntry & { id: string; batchId: string }>> {
  const filters: Array<{ field: string; op: '==' | '>=' | '<='; value: unknown }> = [
    { field: 'batchId', op: '==', value: batchId },
  ];
  if (options?.step) {
    filters.push({ field: 'step', op: '==', value: options.step });
  }
  const results = await queryDocs(COLLECTION, {
    filters,
    orderBy: { field: 'timestamp', direction: 'desc' },
    limit: options?.limit ?? 500,
  });
  return results as Array<BatchLogEntry & { id: string; batchId: string }>;
}
