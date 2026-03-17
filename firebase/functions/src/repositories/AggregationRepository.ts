import * as admin from 'firebase-admin';
import { db, getDoc, setDoc, updateDoc, queryDocs } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'temp_aggregation';

const FieldValue = admin.firestore.FieldValue;

export async function getOrCreate(
  aggregationKey: string,
  initialData: Record<string, unknown>
) {
  const existing = await getDoc(COLLECTION, aggregationKey);
  if (existing) {
    return existing;
  }

  const now = FieldValue.serverTimestamp();
  const data = {
    ...initialData,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, aggregationKey, data);
  return { id: aggregationKey, ...data };
}

export async function addLink(aggregationKey: string, link: object) {
  await updateDoc(COLLECTION, aggregationKey, {
    links: FieldValue.arrayUnion(link),
    linkCount: FieldValue.increment(1),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function getById(aggregationKey: string) {
  return getDoc(COLLECTION, aggregationKey);
}

export async function setComplete(aggregationKey: string) {
  await updateDoc(COLLECTION, aggregationKey, {
    isComplete: true,
    completedAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function getByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [{ field: 'batchId', op: '==', value: batchId }],
    orderBy: { field: 'createdAt', direction: 'asc' },
  });
}

export async function getCompleteByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [
      { field: 'batchId', op: '==', value: batchId },
      { field: 'isComplete', op: '==', value: true },
    ],
    orderBy: { field: 'createdAt', direction: 'asc' },
  });
}
