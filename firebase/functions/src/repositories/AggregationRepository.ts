import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { db, getDoc, updateDoc, queryDocs } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'temp_aggregation';


/**
 * Atomically get or create an aggregation document.
 * Uses a Firestore transaction to prevent concurrent duplicate creation.
 */
export async function getOrCreate(aggregationKey: string, initialData: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc(aggregationKey);
  let result: Record<string, unknown> & { id: string };

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(docRef);
    if (snap.exists) {
      result = { id: snap.id, ...snap.data() } as Record<string, unknown> & { id: string };
      return;
    }

    const now = FieldValue.serverTimestamp();
    const data = { ...initialData, createdAt: now, updatedAt: now };
    tx.set(docRef, data);
    result = { id: aggregationKey, ...data } as Record<string, unknown> & { id: string };
  });

  return result!;
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
