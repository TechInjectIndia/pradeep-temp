import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const credential = getCredential();
  admin.initializeApp(credential ? { credential } : undefined);
}

function getCredential(): admin.credential.Credential | undefined {
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (clientEmail && privateKey && projectId) {
    const key = privateKey.replace(/\\n/g, '\n');
    return admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: key,
      clientId: process.env.FIREBASE_CLIENT_ID,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    } as admin.ServiceAccount);
  }

  const json = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (json) {
    try {
      const parsed = typeof json === 'string' ? JSON.parse(json) : json;
      return admin.credential.cert(parsed as admin.ServiceAccount);
    } catch (e) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:', e);
    }
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return admin.credential.applicationDefault();
  }
  return undefined;
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
  offset?: number;
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

  if (options?.offset) {
    query = query.offset(options.offset);
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
