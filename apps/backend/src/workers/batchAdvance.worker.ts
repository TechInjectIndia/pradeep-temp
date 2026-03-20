/**
 * Batch Advance Worker — orchestrates batch stage transitions.
 *
 * VALIDATING → queues ORDER_CREATION for all teachers, advances batch to ORDERING
 * ORDERING   → no-op; ordering.worker processes individual teachers
 * MESSAGING  → fetches specimen links, creates commLog entries, queues WHATSAPP/EMAIL jobs
 * COMPLETE   → logs completion
 */
import { createHash } from 'crypto';
import { consume, publish } from '@/queue';
import { QUEUES, type BatchAdvanceJob, type WhatsAppMessageJob, type EmailMessageJob } from '@/queue/types';
import { db } from '@/db';
import { teachersRaw, orders, commLog, batches } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { LinkService } from '@/services/LinkService';
import { BatchService } from '@/services/BatchService';

// Stage ordering — used to skip stale messages
const STAGE_ORDER: Record<string, number> = {
  UPLOADED: 0, VALIDATING: 1, RESOLVING: 2, ORDERING: 3, MESSAGING: 4, COMPLETE: 5,
  PAUSED: -1, CANCELLED: -1, FAILED: -1, PARTIAL_FAILURE: -1,
};

async function handleBatchAdvance(
  job: BatchAdvanceJob,
  ack: () => void,
  nack: (requeue: boolean) => void
) {
  const { batchId, targetStage } = job;
  console.log(`[batch-advance] batch=${batchId} stage=${targetStage}`);

  try {
    const batch = await BatchService.getById(batchId);
    if (!batch) { console.warn(`[batch-advance] batch=${batchId} not found — skipping`); ack(); return; }

    const currentOrder = STAGE_ORDER[batch.status] ?? -1;
    const targetOrder = STAGE_ORDER[targetStage] ?? -1;

    // Skip stale messages — batch has already moved past this stage
    if (currentOrder > targetOrder) {
      console.log(`[batch-advance] batch=${batchId} already at ${batch.status} — skipping stale ${targetStage} message`);
      ack();
      return;
    }

    switch (targetStage) {
      case 'VALIDATING':
      case 'RESOLVING':
        await handleValidating(batchId);
        break;
      case 'ORDERING':
        await BatchService.addLog(batchId, 'ordering', 'Ordering stage started — processing teachers');
        break;
      case 'MESSAGING':
        await handleMessaging(batchId);
        break;
      case 'COMPLETE':
        await BatchService.addLog(batchId, 'batch_advanced', 'Batch marked complete');
        break;
      default:
        console.log(`[batch-advance] No handler for stage=${targetStage}`);
    }
    ack();
  } catch (err) {
    console.error(`[batch-advance] batch=${batchId} stage=${targetStage} error:`, err);
    ack(); // Ack to avoid infinite requeue; error is captured in batchLogs
  }
}

// ─── VALIDATING: queue ORDER_CREATION for all raw teachers ────────────────────

async function handleValidating(batchId: string) {
  const rawTeachers = await db.query.teachersRaw.findMany({
    where: eq(teachersRaw.batchId, batchId),
  });

  if (rawTeachers.length === 0) {
    await BatchService.addLog(batchId, 'validation', 'No teachers found in batch — nothing to process');
    return;
  }

  // Set expected order count in batch stats
  await BatchService.updateStats(batchId, {
    totalTeachers: rawTeachers.length,
    expectedOrders: rawTeachers.length,
    ordersCreated: 0,
  });

  // Queue an ORDER_CREATION job for every teacher
  for (const teacher of rawTeachers) {
    await publish(QUEUES.ORDER_CREATION, {
      batchId,
      teacherRecordId: teacher.id,
      teacherMasterId: teacher.teacherMasterId ?? '',
      retryCount: 0,
    });
  }

  await BatchService.addLog(
    batchId,
    'validation',
    `Queued ${rawTeachers.length} order creation jobs`,
    `${rawTeachers.length} teachers will be resolved and ordered`
  );

  // Advance batch directly to ORDERING (bypass RESOLVING stage to avoid recursive publish)
  await db
    .update(batches)
    .set({ status: 'ORDERING', updatedAt: new Date() })
    .where(eq(batches.id, batchId));

  console.log(`[batch-advance] batch=${batchId} → ORDERING (${rawTeachers.length} jobs queued)`);
}

// ─── MESSAGING: fetch links, create commLogs, queue messages ──────────────────

async function handleMessaging(batchId: string) {
  await BatchService.addLog(batchId, 'aggregation', 'Fetching specimen links from LMS API...');

  // 1. Generate specimen links for all orders
  let linkResult: { teacherCount: number; linkCount: number };
  try {
    linkResult = await LinkService.generateForBatch(batchId);
    await BatchService.addLog(
      batchId,
      'aggregation_complete',
      `Links fetched: ${linkResult.teacherCount} teachers, ${linkResult.linkCount} total links`
    );
    console.log(`[batch-advance] batch=${batchId} links: ${linkResult.linkCount} across ${linkResult.teacherCount} teachers`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    await BatchService.addLog(batchId, 'error', `Failed to fetch specimen links: ${msg}`);
    throw err;
  }

  // 2. Load all orders with their resolved books
  const batchOrders = await db.query.orders.findMany({
    where: eq(orders.batchId, batchId),
  });

  if (batchOrders.length === 0) {
    await BatchService.addLog(batchId, 'error', 'No orders found — cannot queue messages');
    return;
  }

  let queued = 0;

  for (const order of batchOrders) {
    const books = (order.books ?? []).map((b) => ({
      title: b.title,
      specimenUrl: b.specimenUrl,
      productId: b.productId,
    }));

    const specimenDetails = books.map((b) => `${b.title}: ${b.specimenUrl}`).join('\n');

    // ─── WhatsApp ─────────────────────────────────────────────────────────────
    if (order.sendWhatsApp && order.teacherPhone) {
      const hash = createHash('sha256')
        .update(`${order.teacherPhone}:${batchId}:WHATSAPP`)
        .digest('hex');

      const [waInserted] = await db
        .insert(commLog)
        .values({
          id: hash,
          messageHash: hash,
          batchId,
          teacherMasterId: order.teacherMasterId ?? undefined,
          teacherRecordId: order.teacherRecordId,
          channel: 'WHATSAPP',
          teacherPhone: order.teacherPhone,
          teacherName: order.teacherName,
          books: books.map((b) => b.title).join(', '),
          status: 'QUEUED',
        })
        .onConflictDoNothing()
        .returning({ id: commLog.id });

      if (waInserted) {
        const waJob: WhatsAppMessageJob = {
          type: 'WHATSAPP',
          batchId,
          teacherRecordId: order.teacherRecordId,
          teacherMasterId: order.teacherMasterId ?? '',
          phone: order.teacherPhone,
          name: order.teacherName,
          school: order.school ?? undefined,
          city: order.city ?? undefined,
          email: order.teacherEmail ?? undefined,
          specimenDetails,
          commLogId: hash,
          retryCount: 0,
          books,
        };

        await publish(QUEUES.WHATSAPP_MESSAGES, waJob);
        queued++;

        await BatchService.addLog(
          batchId,
          'outbox_queued',
          `WhatsApp queued for ${order.teacherName} (${books.length} books)`,
          order.teacherPhone
        );
      } else {
        console.log(`[batch-advance] batch=${batchId} WhatsApp already queued for ${order.teacherName} — skipping`);
      }
    }

    // ─── Email ────────────────────────────────────────────────────────────────
    if (order.sendEmail && order.teacherEmail) {
      const hash = createHash('sha256')
        .update(`${order.teacherEmail}:${batchId}:EMAIL`)
        .digest('hex');

      const [emailInserted] = await db
        .insert(commLog)
        .values({
          id: hash,
          messageHash: hash,
          batchId,
          teacherMasterId: order.teacherMasterId ?? undefined,
          teacherRecordId: order.teacherRecordId,
          channel: 'EMAIL',
          teacherEmail: order.teacherEmail,
          teacherName: order.teacherName,
          books: books.map((b) => b.title).join(', '),
          status: 'QUEUED',
        })
        .onConflictDoNothing()
        .returning({ id: commLog.id });

      if (emailInserted) {
        const emailJob: EmailMessageJob = {
          type: 'EMAIL',
          batchId,
          teacherRecordId: order.teacherRecordId,
          teacherMasterId: order.teacherMasterId ?? '',
          email: order.teacherEmail,
          name: order.teacherName,
          specimenDetails,
          commLogId: hash,
          retryCount: 0,
        };

        await publish(QUEUES.EMAIL_MESSAGES, emailJob);
        queued++;

        await BatchService.addLog(
          batchId,
          'outbox_queued',
          `Email queued for ${order.teacherName} (${books.length} books)`,
          order.teacherEmail
        );
      } else {
        console.log(`[batch-advance] batch=${batchId} Email already queued for ${order.teacherName} — skipping`);
      }
    }
  }

  // 3. Update stats
  await BatchService.updateStats(batchId, { messagesQueued: queued });
  await BatchService.addLog(
    batchId,
    'batch_advanced',
    `Messaging started: ${queued} messages queued across ${batchOrders.length} teachers`
  );

  console.log(`[batch-advance] batch=${batchId} → MESSAGING: ${queued} messages queued`);

  // If no messages were queued (e.g. all duplicates or no contacts), auto-advance to COMPLETE
  if (queued === 0) {
    try {
      await BatchService.advance(batchId, 'auto_no_messages');
      console.log(`[batch-advance] batch=${batchId} no messages to send → COMPLETE`);
    } catch {
      // Already advanced — safe to ignore
    }
  }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function main() {
  console.log('[batch-advance] Starting...');
  await consume(QUEUES.BATCH_ADVANCE, (msg, ack, nack) =>
    handleBatchAdvance(msg as BatchAdvanceJob, ack, nack)
  );
  console.log('[batch-advance] Ready');
}

main().catch((err) => {
  console.error('[batch-advance] Fatal error:', err);
  process.exit(1);
});
