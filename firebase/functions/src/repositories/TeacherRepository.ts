import * as admin from 'firebase-admin';
import { db, getDoc, setDoc, updateDoc, queryDocs } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'teachers_master';
const PHONE_LOOKUP_COLLECTION = 'phone_lookup';
const EMAIL_LOOKUP_COLLECTION = 'email_lookup';

const FieldValue = admin.firestore.FieldValue;

export async function getById(teacherId: string) {
  return getDoc(COLLECTION, teacherId);
}

export async function create(data: Record<string, unknown>) {
  const docRef = db.collection(COLLECTION).doc();
  const teacherId = docRef.id;
  const now = FieldValue.serverTimestamp();

  const teacherData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(COLLECTION, teacherId, teacherData);

  // Create phone_lookup entries
  const phones = (data.phones as string[]) || [];
  for (const phone of phones) {
    await setDoc(PHONE_LOOKUP_COLLECTION, phone, { teacherId });
  }

  // Create email_lookup entries
  const emails = (data.emails as string[]) || [];
  for (const email of emails) {
    await setDoc(EMAIL_LOOKUP_COLLECTION, email, { teacherId });
  }

  return { id: teacherId, ...teacherData };
}

export async function update(teacherId: string, data: Partial<Record<string, unknown>>) {
  const updateData = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await updateDoc(COLLECTION, teacherId, updateData);
}

export async function addPhone(teacherId: string, phone: string) {
  await updateDoc(COLLECTION, teacherId, {
    phones: FieldValue.arrayUnion(phone),
    updatedAt: FieldValue.serverTimestamp(),
  });
  await setDoc(PHONE_LOOKUP_COLLECTION, phone, { teacherId });
}

export async function addEmail(teacherId: string, email: string) {
  await updateDoc(COLLECTION, teacherId, {
    emails: FieldValue.arrayUnion(email),
    updatedAt: FieldValue.serverTimestamp(),
  });
  await setDoc(EMAIL_LOOKUP_COLLECTION, email, { teacherId });
}

export async function listPaginated(limit: number, startAfter?: string) {
  let startAfterSnap: admin.firestore.DocumentSnapshot | undefined;

  if (startAfter) {
    startAfterSnap = await db.collection(COLLECTION).doc(startAfter).get();
  }

  return queryDocs(COLLECTION, {
    orderBy: { field: 'createdAt', direction: 'desc' },
    limit,
    startAfter: startAfterSnap,
  });
}
