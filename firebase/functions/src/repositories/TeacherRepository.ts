import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import {
  db,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  queryDocs,
} from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'teachers_master';
const PHONE_LOOKUP_COLLECTION = 'phone_lookup';
const EMAIL_LOOKUP_COLLECTION = 'email_lookup';


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

/**
 * Replace phones and emails arrays on a teacher and sync lookup collections.
 * Removes lookups for values no longer in the arrays, adds lookups for new values.
 */
export async function replacePhonesAndEmails(
  teacherId: string,
  phones: string[],
  emails: string[],
): Promise<void> {
  const existing = await getById(teacherId);
  if (!existing) throw new Error(`Teacher ${teacherId} not found`);

  const existingData = existing as Record<string, unknown>;
  const oldPhones: string[] = (existingData.phones as string[]) || [];
  const oldEmails: string[] = (existingData.emails as string[]) || [];

  const oldPhoneSet = new Set(oldPhones);
  const newPhoneSet = new Set(phones);
  const oldEmailSet = new Set(oldEmails);
  const newEmailSet = new Set(emails);

  // Remove lookups for phones no longer in the array
  for (const p of oldPhones) {
    if (!newPhoneSet.has(p)) {
      await deleteDoc(PHONE_LOOKUP_COLLECTION, p);
    }
  }
  // Remove lookups for emails no longer in the array
  for (const e of oldEmails) {
    if (!newEmailSet.has(e)) {
      await deleteDoc(EMAIL_LOOKUP_COLLECTION, e);
    }
  }
  // Add lookups for new phones
  for (const p of phones) {
    await setDoc(PHONE_LOOKUP_COLLECTION, p, { teacherId });
  }
  // Add lookups for new emails
  for (const e of emails) {
    await setDoc(EMAIL_LOOKUP_COLLECTION, e, { teacherId });
  }

  await updateDoc(COLLECTION, teacherId, {
    phones,
    emails,
    updatedAt: FieldValue.serverTimestamp(),
  });
}

export async function listPaginated(limit: number, page: number = 1) {
  const offset = (page - 1) * limit;

  return queryDocs(COLLECTION, {
    orderBy: { field: 'createdAt', direction: 'desc' },
    limit,
    offset: offset > 0 ? offset : undefined,
  });
}
