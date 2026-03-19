import { FieldValue } from 'firebase-admin/firestore';
import { db } from '../infrastructure/firestore/FirestoreAdapter';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as AggregationRepository from '../repositories/AggregationRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';
import { config } from '../config';
import type { OrderBook, OrderDocument, SingleOrderResult } from '../types/order';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Convert a book title to a URL-safe slug.
 * e.g. "Mathematics Class 10" → "mathematics-class-10"
 */
function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')       // spaces → hyphens
    .replace(/-+/g, '-')        // collapse multiple hyphens
    .replace(/^-|-$/g, '');     // trim leading/trailing hyphens
}

function normalizePhone(phone: string): string {
  return (phone || '').replace(/\D/g, '');
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface CreateOrdersResult {
  /** Total raw teacher records in this batch */
  totalTeachers: number;
  /** Teachers successfully resolved and eligible for an order */
  resolvedTeachers: number;
  /** Teachers skipped — resolution failed or no master ID assigned */
  skippedTeachers: number;
  /** Number of order-creation tasks actually enqueued */
  ordersToCreate: number;
}

/**
 * Create specimen orders for all resolved teachers in a batch.
 *
 * Flow:
 *  1. Collect all resolved raw teachers and their books.
 *  2. Build the Order API payload:
 *       { batchId, teachers: { teacherRecordId: ["productId1", "productId2"] } }
 *  3. Call the external Order API (or LocalOrderAdapter in emulator).
 *     Response: { batchId, teachers: { teacherRecordId: { productId: "link" } } }
 *  4. For each teacher, persist an OrderDocument to `orders` and populate
 *     the `temp_aggregation` record with the returned links.
 *  5. Mark aggregations complete and advance the batch state machine.
 */
export async function createOrdersForBatch(batchId: string): Promise<CreateOrdersResult> {
  const rawTeachers = await TeacherRawRepository.getByBatchId(batchId);

  const resolved = rawTeachers.filter(
    (r: any) => r.resolutionStatus === 'resolved' && r.teacherMasterId,
  );
  const skipped = rawTeachers.length - resolved.length;

  if (resolved.length === 0) {
    return {
      totalTeachers: rawTeachers.length,
      resolvedTeachers: 0,
      skippedTeachers: skipped,
      ordersToCreate: 0,
    };
  }

  // ── Step 1: Build the Order API payload ────────────────────────────────
  // teachers: { teacherRecordId → productId[] }
  const teachersPayload: Record<string, string[]> = {};

  for (const record of resolved) {
    const raw = record as any;
    const bookTitles: string[] = (raw.books as string || '')
      .split(/[,;]/)
      .map((b: string) => b.trim())
      .filter(Boolean);

    if (bookTitles.length === 0) continue;

    teachersPayload[record.id] = bookTitles.map(toSlug);
  }

  // ── Step 2: Call the Order API ──────────────────────────────────────────
  const orderApi = AdapterRegistry.getInstance().orderApi;
  const apiResponse = await orderApi.createOrders({ batchId, teachers: teachersPayload });

  // ── Step 3: Persist orders and aggregations ─────────────────────────────
  const teacherMap = new Map(resolved.map((r: any) => [r.id, r]));
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + config.app.linkExpiryDays);
  const expiresAtIso = expiresAt.toISOString();
  const now = FieldValue.serverTimestamp();

  let ordersCreated = 0;

  for (const [teacherRecordId, products] of Object.entries(apiResponse.teachers)) {
    const raw = teacherMap.get(teacherRecordId) as any;
    if (!raw) continue;

    // Build typed book list — one entry per productId, single link from API response
    const books: OrderBook[] = [];
    for (const [productId, url] of Object.entries(products)) {
      if (!url) continue;
      const originalTitle =
        (raw.books as string || '')
          .split(/[,;]/)
          .map((b: string) => b.trim())
          .find((b: string) => toSlug(b) === productId) || productId;

      books.push({ title: originalTitle, productId, specimenUrl: url, expiresAt: expiresAtIso });
    }

    if (books.length === 0) continue;

    const orderId = `${teacherRecordId}_${batchId}`;
    const orderRef = db.collection('orders').doc(orderId);

    const orderDoc: OrderDocument = {
      orderId,
      batchId,
      teacherRecordId,
      teacherMasterId: raw.teacherMasterId || '',
      teacherName: raw.name || '',
      teacherPhone: normalizePhone(raw.phone || ''),
      teacherEmail: (raw.email || '').toLowerCase().trim(),
      school: raw.school || '',
      city: raw.city || '',
      books,
      totalBooks: books.length,
      sendWhatsApp: raw.sendWhatsApp === true,
      sendEmail: raw.sendEmail !== false,
      status: 'created',
      expiresAt: expiresAtIso,
    };

    // Idempotent write — skip if order already exists
    const existing = await orderRef.get();
    if (!existing.exists) {
      await orderRef.set({ ...orderDoc, createdAt: now, updatedAt: now });
      ordersCreated++;
    }

    // Create / update aggregation with denormalized teacher details
    const aggregationKey = `${raw.teacherMasterId}_${batchId}`;
    await AggregationRepository.getOrCreate(aggregationKey, {
      teacherMasterId: raw.teacherMasterId || '',
      teacherRecordId,
      batchId,
      teacherName: orderDoc.teacherName,
      teacherPhone: orderDoc.teacherPhone,
      teacherEmail: orderDoc.teacherEmail,
      books: raw.books || '',
      sendWhatsApp: orderDoc.sendWhatsApp,
      sendEmail: orderDoc.sendEmail,
      expectedLinkCount: books.length,
      linkCount: 0,
      isComplete: false,
    });

    // Add each link to the aggregation
    for (const book of books) {
      await AggregationRepository.addLink(aggregationKey, {
        orderId,
        title: book.title,
        productId: book.productId,
        url: book.specimenUrl,
        expiresAt: book.expiresAt,
      });
    }

    await checkAggregationCompletion(aggregationKey);
  }

  // ── Step 4: Update batch stats and log ─────────────────────────────────
  if (ordersCreated > 0) {
    await BatchRepository.incrementStat(batchId, 'stats.ordersCreated', ordersCreated);
  }

  await BatchLogRepository.append(batchId, {
    step: 'ordering_order_created',
    message: `Orders created via Order API`,
    detail: `${ordersCreated} new orders for ${resolved.length} resolved teachers`,
    metadata: {
      batchId,
      ordersCreated,
      totalTeachers: rawTeachers.length,
      resolvedTeachers: resolved.length,
      skippedTeachers: skipped,
    },
  });

  await BatchStateMachine.checkAndAdvanceBatch(batchId);

  return {
    totalTeachers: rawTeachers.length,
    resolvedTeachers: resolved.length,
    skippedTeachers: skipped,
    ordersToCreate: ordersCreated,
  };
}

/**
 * Cloud Task worker handler — creates an order for a single teacher.
 *
 * Order document is DENORMALIZED — stores teacher name/phone/email/school
 * so downstream messaging can send without an extra Firestore fetch.
 *
 * Uses a deterministic order ID (`teacherRecordId_batchId`) for idempotency.
 */
export async function processOrderCreation(
  teacherRecordId: string,
  batchId: string,
): Promise<SingleOrderResult> {
  const orderId = `${teacherRecordId}_${batchId}`;
  const orderRef = db.collection('orders').doc(orderId);

  // Atomic reservation — prevents duplicate orders under concurrent retries
  let alreadyExists = false;
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(orderRef);
    if (snap.exists) {
      alreadyExists = true;
      return;
    }
    tx.set(orderRef, { _placeholder: true });
  });

  if (alreadyExists) {
    console.log(`Order ${orderId} already exists, skipping`);
    return { orderId, teacherRecordId, batchId, totalBooks: 0, books: [], outcome: 'skipped' };
  }

  // Fetch after transaction (transaction reads are limited in size)
  const [rawTeacher, batch] = await Promise.all([
    TeacherRawRepository.getById(teacherRecordId),
    BatchRepository.getById(batchId),
  ]);

  if (!rawTeacher) throw new Error(`Raw teacher record ${teacherRecordId} not found`);
  if (!batch) throw new Error(`Batch ${batchId} not found`);

  const raw = rawTeacher as any;

  // ── Build typed book list ──────────────────────────────────────────────
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + config.app.linkExpiryDays);
  const expiresAtIso = expiresAt.toISOString();
  const base = (config.app.specimenBaseUrl || 'https://specimens.example.com').replace(/\/$/, '');

  const bookTitles: string[] = (raw.books as string || '')
    .split(/[,;]/)
    .map((b: string) => b.trim())
    .filter(Boolean);

  const books: OrderBook[] = bookTitles.map((title) => {
    const productId = toSlug(title);
    return {
      title,
      productId,
      specimenUrl: `${base}/view/${batchId}/${teacherRecordId}/${productId}`,
      expiresAt: expiresAtIso,
    };
  });

  // ── Build the full OrderDocument ──────────────────────────────────────
  const orderDoc: OrderDocument = {
    orderId,
    batchId,
    teacherRecordId,
    teacherMasterId: raw.teacherMasterId || '',
    teacherName: raw.name || '',
    teacherPhone: normalizePhone(raw.phone || ''),
    teacherEmail: (raw.email || '').toLowerCase().trim(),
    school: raw.school || '',
    city: raw.city || '',
    books,
    totalBooks: books.length,
    sendWhatsApp: raw.sendWhatsApp === true,
    sendEmail: raw.sendEmail !== false,   // default true if not set
    status: 'created',
    expiresAt: expiresAtIso,
  };

  // Overwrite the placeholder with the real order
  const now = FieldValue.serverTimestamp();
  await orderRef.set({ ...orderDoc, createdAt: now, updatedAt: now });

  // ── Aggregation (one record per teacher per batch) ────────────────────
  const aggregationKey = `${raw.teacherMasterId}_${batchId}`;

  await AggregationRepository.getOrCreate(aggregationKey, {
    teacherMasterId: raw.teacherMasterId || '',
    teacherRecordId,
    batchId,
    teacherName: orderDoc.teacherName,
    teacherPhone: orderDoc.teacherPhone,
    teacherEmail: orderDoc.teacherEmail,
    books: raw.books || '',
    sendWhatsApp: orderDoc.sendWhatsApp,
    sendEmail: orderDoc.sendEmail,
    expectedLinkCount: books.length,
    linkCount: 0,
    isComplete: false,
  });

  // Add each book link atomically
  await Promise.all(
    books.map((book) =>
      AggregationRepository.addLink(aggregationKey, {
        orderId,
        title: book.title,
        productId: book.productId,
        url: book.specimenUrl,
        expiresAt: book.expiresAt,
      }),
    ),
  );

  await checkAggregationCompletion(aggregationKey);

  await BatchRepository.incrementStat(batchId, 'stats.ordersCreated', 1);

  await BatchLogRepository.append(batchId, {
    step: 'ordering_order_created',
    message: `Order created for ${orderDoc.teacherName || 'teacher'}`,
    detail: `${books.length} book(s): ${bookTitles.join(', ')}`,
    metadata: {
      orderId,
      teacherRecordId,
      teacherName: orderDoc.teacherName,
      school: orderDoc.school,
      totalBooks: books.length,
      books: books.map((b) => ({ title: b.title, productId: b.productId })),
    },
  });

  await BatchStateMachine.checkAndAdvanceBatch(batchId);

  return { orderId, teacherRecordId, batchId, totalBooks: books.length, books, outcome: 'created' };
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
