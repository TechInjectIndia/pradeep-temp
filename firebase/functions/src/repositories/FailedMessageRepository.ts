import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import {
  db,
  getDoc,
  setDoc,
  updateDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'failed_messages';


type Filters = { batchId?: string; isRetryable?: boolean; channel?: string };

function buildQueryFilters(filters?: Filters) {
  const queryFilters: Array<{ field: string; op: admin.firestore.WhereFilterOp; value: unknown }> = [];
  if (filters?.batchId) queryFilters.push({ field: 'batchId', op: '==', value: filters.batchId });
  if (filters?.isRetryable !== undefined) queryFilters.push({ field: 'isRetryable', op: '==', value: filters.isRetryable });
  if (filters?.channel) queryFilters.push({ field: 'channel', op: '==', value: filters.channel });
  return queryFilters;
}

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const failedMessageId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const msgData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, failedMessageId, msgData);
  return { id: failedMessageId, ...msgData };
}

export async function getById(failedMessageId: string) {
  return getDoc(COLLECTION, failedMessageId);
}

export async function update(failedMessageId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, failedMessageId, updateData);
}

export async function count(filters?: Filters): Promise<number> {
  let query: admin.firestore.Query = db.collection(COLLECTION);
  const queryFilters = buildQueryFilters(filters);
  for (const f of queryFilters) {
    query = query.where(f.field, f.op as admin.firestore.WhereFilterOp, f.value);
  }
  const snap = await query.count().get();
  return snap.data().count;
}

export async function list(
  filters?: Filters,
  limit?: number,
  startAfter?: string,
  offset?: number,
) {
  const queryFilters = buildQueryFilters(filters);

  let startAfterSnap: admin.firestore.DocumentSnapshot | undefined;
  if (startAfter) {
    startAfterSnap = await db.collection(COLLECTION).doc(startAfter).get();
  }

  return queryDocs(COLLECTION, {
    filters: queryFilters.length > 0 ? queryFilters : undefined,
    orderBy: { field: 'createdAt', direction: 'desc' },
    limit,
    offset,
    startAfter: startAfterSnap,
  });
}

export async function getRetryableByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [
      { field: 'batchId', op: '==', value: batchId },
      { field: 'isRetryable', op: '==', value: true },
    ],
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}
