import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import {
  db,
  getDoc,
  setDoc,
  updateDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'teachers_raw';

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const teacherRecordId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const rawData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, teacherRecordId, rawData);
  return { id: teacherRecordId, ...rawData };
}

export async function createBatch(records: any[]) {
  const batch = db.batch();
  const now = FieldValue.serverTimestamp();
  const results: Array<{ id: string } & Record<string, unknown>> = [];

  for (const record of records) {
    const docRef = db.collection(COLLECTION).doc();
    const docData = {
      ...record,
      createdAt: now,
      updatedAt: now,
    };
    batch.set(docRef, docData);
    results.push({ id: docRef.id, ...docData });
  }

  await batch.commit();
  return results;
}

export async function getById(teacherRecordId: string) {
  return getDoc(COLLECTION, teacherRecordId);
}

export async function update(teacherRecordId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, teacherRecordId, updateData);
}

export async function getByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [{ field: 'batchId', op: '==', value: batchId }],
    orderBy: { field: 'createdAt', direction: 'asc' },
  });
}

export async function getPendingByBatchId(batchId: string) {
  return queryDocs(COLLECTION, {
    filters: [
      { field: 'batchId', op: '==', value: batchId },
      { field: 'resolutionStatus', op: '==', value: 'pending' },
    ],
    orderBy: { field: 'createdAt', direction: 'asc' },
  });
}
