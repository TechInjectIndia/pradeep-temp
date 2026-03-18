import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../infrastructure/firestore/FirestoreAdapter';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as AggregationRepository from '../repositories/AggregationRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';
import { config } from '../config';

const SPECIMEN_ORDERS_QUEUE = 'specimen-orders';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read resolved teachers for a batch and enqueue individual order-creation
 * tasks via Cloud Tasks. Tasks are enqueued concurrently in chunks.
 */
export async function createOrdersForBatch(batchId: string): Promise<{ ordersToCreate: number }> {
  const rawTeachers = await TeacherRawRepository.getByBatchId(batchId);

  const resolved = rawTeachers.filter(
    (r: any) => r.resolutionStatus === 'resolved' && r.teacherMasterId,
  );

  // Enqueue tasks in parallel chunks of 50 to avoid overwhelming Cloud Tasks
  const CHUNK = 50;
  for (let i = 0; i < resolved.length; i += CHUNK) {
    const chunk = resolved.slice(i, i + CHUNK);
    await Promise.all(
      chunk.map((record: any) =>
        AdapterRegistry.getInstance().taskQueue.enqueueTask(SPECIMEN_ORDERS_QUEUE, {
          teacherRecordId: record.id,
          batchId,
        }),
      ),
    );
  }

  return { ordersToCreate: resolved.length };
}

/**
 * Cloud Task worker handler — creates an order for a single teacher.
 * Uses a deterministic order ID for idempotency: concurrent retries
 * will attempt to set the same document, and the second write is a no-op.
 */
export async function processOrderCreation(
  teacherRecordId: string,
  batchId: string,
): Promise<void> {
  // Deterministic order ID — guarantees idempotency across retries
  const orderId = `${teacherRecordId}_${batchId}`;
  const orderRef = db.collection('orders').doc(orderId);

  // Atomic check-and-create inside a transaction to prevent duplicate orders
  let alreadyExists = false;
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(orderRef);
    if (snap.exists) {
      alreadyExists = true;
      return;
    }

    // Fetch dependencies outside transaction read is fine here — we only
    // need the order doc to not exist (the guard above).
    // Actual data is fetched below after transaction exits.
    tx.set(orderRef, { _placeholder: true }); // Reserve the slot
  });

  if (alreadyExists) {
    console.log(`Order ${orderId} already exists, skipping`);
    return;
  }

  // Fetch data after the transaction (reads inside transactions have limits)
  const [rawTeacher, batch] = await Promise.all([
    TeacherRawRepository.getById(teacherRecordId),
    BatchRepository.getById(batchId),
  ]);

  if (!rawTeacher) throw new Error(`Raw teacher record ${teacherRecordId} not found`);
  if (!batch) throw new Error(`Batch ${batchId} not found`);

  const productIds: string[] = (batch as any).productIds || [];
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + config.app.linkExpiryDays);

  const links = productIds.map((productId) => ({
    productId,
    url: `https://specimens.example.com/view/${batchId}/${teacherRecordId}/${productId}`,
    expiresAt: expiryDate.toISOString(),
  }));

  // Write the real order data (overwrite the placeholder)
  const now = FieldValue.serverTimestamp();
  await orderRef.set({
    teacherRecordId,
    teacherMasterId: (rawTeacher as any).teacherMasterId,
    batchId,
    productIds,
    links,
    status: 'created',
    expiresAt: expiryDate.toISOString(),
    createdAt: now,
    updatedAt: now,
  });

  // Atomic get-or-create aggregation, then add all links
  const aggregationKey = `${(rawTeacher as any).teacherMasterId}_${batchId}`;

  await AggregationRepository.getOrCreate(aggregationKey, {
    teacherMasterId: (rawTeacher as any).teacherMasterId,
    teacherRecordId,
    batchId,
    expectedLinkCount: productIds.length,
    linkCount: 0,
    isComplete: false,
  });

  // Add links — arrayUnion + increment are already atomic Firestore ops
  await Promise.all(
    links.map((link) =>
      AggregationRepository.addLink(aggregationKey, { ...link, orderId }),
    ),
  );

  // Check if aggregation is now complete
  await checkAggregationCompletion(aggregationKey);

  await BatchRepository.incrementStat(batchId, 'stats.ordersCreated', 1);

  await BatchLogRepository.append(batchId, {
    step: 'ordering_order_created',
    message: `Order created for teacher`,
    detail: `teacherRecordId: ${teacherRecordId}, orderId: ${orderId}`,
    metadata: { teacherRecordId, orderId, productCount: productIds.length },
  });

  await BatchStateMachine.checkAndAdvanceBatch(batchId);
}

/**
 * Check whether all expected links have been added to an aggregation record.
 * If complete, marks it as such.
 */
export async function checkAggregationCompletion(aggregationKey: string): Promise<boolean> {
  const aggregation = await AggregationRepository.getById(aggregationKey);
  if (!aggregation) return false;

  const agg = aggregation as any;
  if (agg.isComplete) return true;

  if (agg.linkCount >= agg.expectedLinkCount) {
    await AggregationRepository.setComplete(aggregationKey);
    const batchId = agg.batchId;
    if (batchId) {
      BatchLogRepository.append(batchId, {
        step: 'aggregation_complete',
        message: 'Aggregation complete for teacher',
        detail: `aggregationKey: ${aggregationKey}`,
        metadata: { aggregationKey, teacherMasterId: agg.teacherMasterId },
      }).catch((e) => console.error('BatchLog append failed:', e));
    }
    return true;
  }

  return false;
}
