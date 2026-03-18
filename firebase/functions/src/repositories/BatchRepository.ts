import { FieldValue } from 'firebase-admin/firestore';
import * as admin from 'firebase-admin';
import {
  db,
  getDoc,
  setDoc,
  updateDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'specimen_batches';

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const batchId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const batchData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, batchId, batchData);
  return { id: batchId, ...batchData };
}

export async function getById(batchId: string) {
  return getDoc(COLLECTION, batchId);
}

export async function update(batchId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, batchId, updateData);
}

export async function incrementStat(batchId: string, field: string, value: number) {
  await updateDoc(COLLECTION, batchId, {
    [field]: FieldValue.increment(value),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function count(filters?: { status?: string }): Promise<number> {
  let query: admin.firestore.Query = db.collection(COLLECTION);
  if (filters?.status) query = query.where('status', '==', filters.status);
  const snap = await query.count().get();
  return snap.data().count;
}

export async function list(
  filters?: { status?: string },
  limit?: number,
  startAfter?: string,
  offset?: number,
) {
  const queryFilters: Array<{ field: string; op: admin.firestore.WhereFilterOp; value: unknown }> = [];

  if (filters?.status) {
    queryFilters.push({ field: 'status', op: '==', value: filters.status });
  }

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

export async function getByStatus(status: string) {
  return queryDocs(COLLECTION, {
    filters: [{ field: 'status', op: '==', value: status }],
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}
