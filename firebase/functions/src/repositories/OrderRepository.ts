import * as admin from 'firebase-admin';
import { db, getDoc, setDoc, updateDoc, queryDocs } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'orders';

const FieldValue = admin.firestore.FieldValue;

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const orderId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const orderData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, orderId, orderData);
  return { id: orderId, ...orderData };
}

export async function getById(orderId: string) {
  return getDoc(COLLECTION, orderId);
}

export async function update(orderId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, orderId, updateData);
}

export async function getByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [{ field: 'batchId', op: '==', value: batchId }],
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}

export async function getByTeacherAndBatch(teacherRecordId: string, batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [
      { field: 'teacherRecordId', op: '==', value: teacherRecordId },
      { field: 'batchId', op: '==', value: batchId },
    ],
  });
}
