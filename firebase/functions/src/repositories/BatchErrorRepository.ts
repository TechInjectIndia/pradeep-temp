import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import {
  db,
  getDoc,
  setDoc,
  updateDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'batch_errors';


export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const errorId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const errorData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, errorId, errorData);
  return { id: errorId, ...errorData };
}

export async function getById(errorId: string) {
  return getDoc(COLLECTION, errorId);
}

export async function update(errorId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, errorId, updateData);
}

export async function getByBatch(
  batchId: string,
  filters?: { stage?: string; isRetryable?: boolean },
) {
  const queryFilters: Array<{ field: string; op: admin.firestore.WhereFilterOp; value: unknown }> =
    [{ field: 'batchId', op: '==', value: batchId }];

  if (filters?.stage) {
    queryFilters.push({ field: 'stage', op: '==', value: filters.stage });
  }

  if (filters?.isRetryable !== undefined) {
    queryFilters.push({ field: 'isRetryable', op: '==', value: filters.isRetryable });
  }

  return queryDocs(COLLECTION, {
    filters: queryFilters,
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}

export async function getRetryableByBatchAndStage(batchId: string, stage: string) {
  return queryDocs(COLLECTION, {
    filters: [
      { field: 'batchId', op: '==', value: batchId },
      { field: 'stage', op: '==', value: stage },
      { field: 'isRetryable', op: '==', value: true },
    ],
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}
