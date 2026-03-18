import { FieldValue } from 'firebase-admin/firestore';
import { db, setDoc } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'admin_activity_log';

export type AdminActivityType =
  | 'batch_uploaded'
  | 'batch_reviewed_upload'
  | 'teachers_resolved'
  | 'orders_created'
  | 'messages_queued'
  | 'message_sent'
  | 'message_delivered'
  | 'message_failed'
  | 'batch_status_change';

export interface AdminActivityEntry {
  type: AdminActivityType;
  batchId?: string;
  teacherCount?: number;
  message?: string;
  metadata?: Record<string, unknown>;
}

function sanitize(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

export async function append(entry: AdminActivityEntry): Promise<string> {
  const docRef = db.collection(COLLECTION).doc();
  const data = sanitize(entry as unknown as Record<string, unknown>);
  await setDoc(COLLECTION, docRef.id, {
    ...data,
    createdAt: FieldValue.serverTimestamp(),
  });
  return docRef.id;
}
