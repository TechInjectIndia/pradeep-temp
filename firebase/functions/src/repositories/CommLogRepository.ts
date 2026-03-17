import * as admin from 'firebase-admin';
import { db, getDoc, setDoc, updateDoc, queryDocs } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'comm_log';

const FieldValue = admin.firestore.FieldValue;

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const messageId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const logData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, messageId, logData);
  return { id: messageId, ...logData };
}

export async function getById(messageId: string) {
  return getDoc(COLLECTION, messageId);
}

export async function update(messageId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, messageId, updateData);
}

export async function findByMessageHash(messageHash: string): Promise<any | null> {
  const results = await queryDocs(COLLECTION, {
    filters: [{ field: 'messageHash', op: '==', value: messageHash }],
    limit: 1,
  });
  return results.length > 0 ? results[0] : null;
}

export async function getByBatchId(batchId: string, status?: string) {
  const filters: Array<{ field: string; op: admin.firestore.WhereFilterOp; value: unknown }> = [
    { field: 'batchId', op: '==', value: batchId },
  ];

  if (status) {
    filters.push({ field: 'status', op: '==', value: status });
  }

  return queryDocs(COLLECTION, {
    filters,
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}
