import * as admin from 'firebase-admin';
import {
  db,
  getDoc,
  setDoc,
  updateDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'teacher_communications';

const FieldValue = admin.firestore.FieldValue;

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const communicationId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const commData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, communicationId, commData);
  return { id: communicationId, ...commData };
}

export async function getById(communicationId: string) {
  return getDoc(COLLECTION, communicationId);
}

export async function getByTeacherAndBatch(teacherId: string, batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [
      { field: 'teacherId', op: '==', value: teacherId },
      { field: 'batchId', op: '==', value: batchId },
    ],
  });
}

export async function updateDeliveryStatus(
  communicationId: string,
  status: string,
  error?: string,
) {
  const updateData: Record<string, unknown> = {
    deliveryStatus: status,
    updatedAt: FieldValue.serverTimestamp(),
  };

  if (error !== undefined) {
    updateData.deliveryError = error;
  }

  await updateDoc(COLLECTION, communicationId, updateData);
}

export async function findByExternalMessageId(externalMessageId: string) {
  const results = await queryDocs(COLLECTION, {
    filters: [{ field: 'externalMessageId', op: '==', value: externalMessageId }],
    limit: 1,
  });
  return results.length > 0 ? results[0] : null;
}

export async function getByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [{ field: 'batchId', op: '==', value: batchId }],
    orderBy: { field: 'createdAt', direction: 'desc' },
  });
}
