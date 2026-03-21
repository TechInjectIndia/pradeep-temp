/**
 * Ordering Worker -- consumes ORDER_CREATION queue.
 * Resolves teacher master records and creates orders.
 * Pre-resolved rows (approved merges from upload UI) skip the upsert step.
 */
import { createWorker, addJob, QUEUES } from '@/queue';
import type { OrderCreationJob } from '@/queue/types';
import type { Job } from 'bullmq';
import { db } from '@/db';
import { teachersRaw, orders, batchErrors, batches, type BatchStats } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { TeacherService } from '@/services/TeacherService';
import { BatchService } from '@/services/BatchService';
import { nanoid } from 'nanoid';

createWorker<OrderCreationJob>(QUEUES.ORDER_CREATION, async (job: Job<OrderCreationJob>) => {
  const { batchId, teacherRecordId, retryCount } = job.data;

  try {
    const rawTeacher = await db.query.teachersRaw.findFirst({
      where: eq(teachersRaw.id, teacherRecordId),
    });

    if (!rawTeacher) {
      console.warn(`[ordering-worker] batch=${batchId} record=${teacherRecordId} not found -- skipping`);
      return;
    }

    let teacherMasterId: string;
    let teacherName: string;
    let teacherPhone: string | null;
    let teacherEmail: string | null;
    let teacherSchool: string | null | undefined;
    let teacherCity: string | null | undefined;

    if (rawTeacher.resolutionStatus === 'RESOLVED' && rawTeacher.teacherMasterId) {
      // Pre-resolved by admin during upload (approved merge) -- skip upsert entirely
      teacherMasterId = rawTeacher.teacherMasterId;
      teacherName = rawTeacher.name ?? 'Unknown';
      teacherPhone = rawTeacher.phone ?? null;
      teacherEmail = rawTeacher.email ?? null;
      teacherSchool = rawTeacher.school ?? rawTeacher.institutionName;
      teacherCity = rawTeacher.city;
    } else {
      // Resolve teacher master record via upsert (find-or-create)
      const { teacher, isNew } = await TeacherService.upsert({
        name: rawTeacher.name ?? 'Unknown',
        phone: rawTeacher.phone ?? undefined,
        email: rawTeacher.email ?? undefined,
        school: rawTeacher.school ?? undefined,
        city: rawTeacher.city ?? undefined,
        recordId: rawTeacher.recordId ?? undefined,
        booksAssigned: rawTeacher.booksAssigned ?? undefined,
        teacherOwnerId: rawTeacher.teacherOwnerId ?? undefined,
        teacherOwner: rawTeacher.teacherOwner ?? undefined,
        firstName: rawTeacher.firstName ?? undefined,
        lastName: rawTeacher.lastName ?? undefined,
        salutation: rawTeacher.salutation ?? undefined,
        institutionId: rawTeacher.institutionId ?? undefined,
        institutionName: rawTeacher.institutionName ?? undefined,
      });

      teacherMasterId = teacher.id;
      teacherName = rawTeacher.name ?? teacher.name;
      teacherPhone = rawTeacher.phone ?? teacher.phones[0] ?? null;
      teacherEmail = rawTeacher.email ?? teacher.emails[0] ?? null;
      teacherSchool = rawTeacher.school ?? rawTeacher.institutionName ?? teacher.school;
      teacherCity = rawTeacher.city ?? teacher.city;

      await db
        .update(teachersRaw)
        .set({
          teacherMasterId: teacher.id,
          isNewTeacher: isNew,
          resolutionStatus: 'RESOLVED',
          resolutionConfidence: 1.0,
          updatedAt: new Date(),
        })
        .where(eq(teachersRaw.id, teacherRecordId));
    }

    // Create order (idempotent via onConflictDoNothing)
    const orderId = `${teacherRecordId}__${batchId}`;
    await db
      .insert(orders)
      .values({
        id: orderId,
        batchId,
        teacherRecordId,
        teacherMasterId,
        teacherName,
        teacherPhone,
        teacherEmail,
        school: teacherSchool,
        city: teacherCity,
        books: [],
        sendWhatsApp: rawTeacher.sendWhatsApp ?? true,
        sendEmail: rawTeacher.sendEmail ?? false,
        status: 'created',
      })
      .onConflictDoNothing();

    await BatchService.addLog(
      batchId,
      'ordering_order_created',
      `Order created for ${teacherName}`,
      teacherMasterId
    );

    // Atomically increment ordersCreated and check if all expected orders are done
    const [updated] = await db
      .update(batches)
      .set({
        stats: sql`jsonb_set(
          COALESCE(stats, '{}'::jsonb),
          '{ordersCreated}',
          to_jsonb(COALESCE((stats->>'ordersCreated')::int, 0) + 1)
        )`,
        updatedAt: new Date(),
      })
      .where(eq(batches.id, batchId))
      .returning();

    const stats = updated?.stats as BatchStats | undefined;
    const created = stats?.ordersCreated ?? 0;
    const expected = stats?.expectedOrders ?? 0;
    if (expected > 0 && created >= expected) {
      try {
        await BatchService.advance(batchId, 'auto_ordering_complete');
        console.log(`[ordering-worker] batch=${batchId} all ${expected} orders done -> MESSAGING`);
      } catch {
        // Another worker already advanced -- safe to ignore
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[ordering-worker] batch=${batchId} record=${teacherRecordId} retry=${retryCount}:`, errorMessage);

    if (retryCount >= 2) {
      await db.insert(batchErrors).values({
        id: nanoid(),
        batchId,
        stage: 'ORDERS',
        teacherRawId: teacherRecordId,
        errorType: 'ORDER_CREATION_FAILED',
        errorMessage,
        isRetryable: true,
      });

      await db
        .update(teachersRaw)
        .set({ resolutionStatus: 'FAILED', resolutionError: errorMessage, updatedAt: new Date() })
        .where(eq(teachersRaw.id, teacherRecordId));

      // Don't rethrow -- error recorded in DB for retry UI
      return;
    }

    // Rethrow to let BullMQ retry
    throw err;
  }
}, {
  concurrency: 10,
  autorun: true,
});

console.log('[ordering-worker] Ready');
