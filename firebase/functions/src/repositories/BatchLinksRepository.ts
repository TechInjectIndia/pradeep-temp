import { FieldValue } from 'firebase-admin/firestore';
import { db, setDoc } from '../infrastructure/firestore/FirestoreAdapter';
import type { GenerateLinksResponse } from '../types/specimen';

const COLLECTION = 'batch_links';

export async function save(
  batchId: string,
  response: Omit<GenerateLinksResponse, 'savedTo' | 'savedDocId'>,
): Promise<string> {
  const docRef = db.collection(COLLECTION).doc();
  const data = {
    batchId,
    links: response.links,
    expiresAt: response.expiresAt,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await setDoc(COLLECTION, docRef.id, data);
  return docRef.id;
}

export async function getByBatchId(batchId: string) {
  const results = await db
    .collection(COLLECTION)
    .where('batchId', '==', batchId)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();
  if (results.empty) return null;
  const doc = results.docs[0];
  return { id: doc.id, ...doc.data() };
}
