import { getDoc, setDoc, deleteDoc } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'phone_lookup';

export async function lookup(normalizedPhone: string): Promise<string | null> {
  const doc = await getDoc<{ teacherId: string }>(COLLECTION, normalizedPhone);
  return doc ? doc.teacherId : null;
}

export async function create(normalizedPhone: string, teacherId: string) {
  await setDoc(COLLECTION, normalizedPhone, { teacherId });
}

export async function remove(normalizedPhone: string) {
  await deleteDoc(COLLECTION, normalizedPhone);
}
