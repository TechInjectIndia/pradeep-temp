import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

export const db = admin.firestore();

export async function getDoc<T = admin.firestore.DocumentData>(
  collectionPath: string,
  docId: string,
): Promise<(T & { id: string }) | null> {
  const snap = await db.collection(collectionPath).doc(docId).get();
  if (!snap.exists) {
    return null;
  }
  return { id: snap.id, ...(snap.data() as T) };
}

export async function setDoc(
  collectionPath: string,
  docId: string,
  data: Record<string, unknown>,
  options?: { merge?: boolean },
): Promise<void> {
  const ref = db.collection(collectionPath).doc(docId);
  if (options?.merge) {
    await ref.set(data, { merge: true });
  } else {
    await ref.set(data);
  }
}

export async function updateDoc(
  collectionPath: string,
  docId: string,
  data: Record<string, unknown>,
): Promise<void> {
  await db.collection(collectionPath).doc(docId).update(data);
}

export async function deleteDoc(collectionPath: string, docId: string): Promise<void> {
  await db.collection(collectionPath).doc(docId).delete();
}

export interface QueryFilter {
  field: string;
  op: admin.firestore.WhereFilterOp;
  value: unknown;
}

export interface QueryOptions {
  filters?: QueryFilter[];
  orderBy?: { field: string; direction?: 'asc' | 'desc' };
  limit?: number;
  startAfter?: admin.firestore.DocumentSnapshot;
}

export async function queryDocs<T = admin.firestore.DocumentData>(
  collectionPath: string,
  options?: QueryOptions,
): Promise<Array<T & { id: string }>> {
  let query: admin.firestore.Query = db.collection(collectionPath);

  if (options?.filters) {
    for (const filter of options.filters) {
      query = query.where(filter.field, filter.op, filter.value);
    }
  }

  if (options?.orderBy) {
    query = query.orderBy(options.orderBy.field, options.orderBy.direction || 'asc');
  }

  if (options?.startAfter) {
    query = query.startAfter(options.startAfter);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const snap = await query.get();
  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as T),
  }));
}

export async function runTransaction<T>(
  fn: (transaction: admin.firestore.Transaction) => Promise<T>,
): Promise<T> {
  return db.runTransaction(fn);
}
