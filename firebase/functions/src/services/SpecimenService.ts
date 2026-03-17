import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as OrderRepository from '../repositories/OrderRepository';
import * as AggregationRepository from '../repositories/AggregationRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import * as CloudTasksAdapter from '../infrastructure/cloudtasks/CloudTasksAdapter';
import { config } from '../config';

const SPECIMEN_ORDERS_QUEUE = 'specimen-orders';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read resolved teachers for a batch and enqueue individual order-creation
 * tasks via Cloud Tasks.
 *
 * Returns the number of tasks enqueued.
 */
export async function createOrdersForBatch(
  batchId: string,
): Promise<{ ordersToCreate: number }> {
  const rawTeachers = await TeacherRawRepository.getByBatchId(batchId);

  // Only consider resolved records that have a teacher_master link
  const resolved = rawTeachers.filter(
    (r: any) => r.resolutionStatus === 'resolved' && r.teacherMasterId,
  );

  let enqueued = 0;
  for (const record of resolved) {
    await CloudTasksAdapter.enqueueTask(SPECIMEN_ORDERS_QUEUE, {
      teacherRecordId: record.id,
      batchId,
    });
    enqueued++;
  }

  return { ordersToCreate: enqueued };
}

/**
 * Cloud Task worker handler — creates an order for a single teacher, generates
 * specimen links, and writes them to the temp_aggregation collection.
 */
export async function processOrderCreation(
  teacherRecordId: string,
  batchId: string,
): Promise<void> {
  // Guard: check if order already exists (idempotency)
  const existingOrders = await OrderRepository.getByTeacherAndBatch(
    teacherRecordId,
    batchId,
  );
  if (existingOrders.length > 0) {
    console.log(
      `Order already exists for teacher ${teacherRecordId} in batch ${batchId}, skipping`,
    );
    return;
  }

  // Fetch raw teacher record for metadata
  const rawTeacher = await TeacherRawRepository.getById(teacherRecordId);
  if (!rawTeacher) {
    throw new Error(`Raw teacher record ${teacherRecordId} not found`);
  }

  // Fetch batch for product details
  const batch = await BatchRepository.getById(batchId);
  if (!batch) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const productIds: string[] = (batch as any).productIds || [];
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + config.app.linkExpiryDays);

  // Generate specimen links per product
  const links = productIds.map((productId) => ({
    productId,
    url: `https://specimens.example.com/view/${batchId}/${teacherRecordId}/${productId}`,
    expiresAt: expiryDate.toISOString(),
  }));

  // Create the order
  const order = await OrderRepository.create({
    teacherRecordId,
    teacherMasterId: (rawTeacher as any).teacherMasterId,
    batchId,
    productIds,
    links,
    status: 'created',
    expiresAt: expiryDate.toISOString(),
  });

  // Write to temp_aggregation keyed by teacherMasterId-batchId
  const aggregationKey = `${(rawTeacher as any).teacherMasterId}_${batchId}`;

  await AggregationRepository.getOrCreate(aggregationKey, {
    teacherMasterId: (rawTeacher as any).teacherMasterId,
    teacherRecordId,
    batchId,
    expectedLinkCount: productIds.length,
    linkCount: 0,
    isComplete: false,
  });

  // Add each link to the aggregation
  for (const link of links) {
    await AggregationRepository.addLink(aggregationKey, {
      ...link,
      orderId: order.id,
    });
  }

  // Check if aggregation is now complete
  await checkAggregationCompletion(aggregationKey);

  // Update batch stats
  await BatchRepository.incrementStat(batchId, 'stats.ordersCreated', 1);
}

/**
 * Check whether all expected links have been added to an aggregation record.
 * If complete, marks it as such.
 */
export async function checkAggregationCompletion(
  aggregationKey: string,
): Promise<boolean> {
  const aggregation = await AggregationRepository.getById(aggregationKey);
  if (!aggregation) return false;

  const agg = aggregation as any;
  if (agg.isComplete) return true;

  if (agg.linkCount >= agg.expectedLinkCount) {
    await AggregationRepository.setComplete(aggregationKey);
    return true;
  }

  return false;
}
