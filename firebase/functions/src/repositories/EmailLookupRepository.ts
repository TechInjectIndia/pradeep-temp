import { getDoc, setDoc, deleteDoc } from '../infrastructure/firestore/FirestoreAdapter';

const COLLECTION = 'email_lookup';

export async function lookup(normalizedEmail: string): Promise<string | null> {
  const doc = await getDoc<{ teacherId: string }>(COLLECTION, normalizedEmail);
  return doc ? doc.teacherId : null;
}

export async function create(normalizedEmail: string, teacherId: string) {
  await setDoc(COLLECTION, normalizedEmail, { teacherId });
}

export async function remove(normalizedEmail: string) {
  await deleteDoc(COLLECTION, normalizedEmail);
}
