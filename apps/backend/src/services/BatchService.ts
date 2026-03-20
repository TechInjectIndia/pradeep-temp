import { eq, and, desc, count } from 'drizzle-orm';
import { db } from '@/db';
import {
  batches,
  teachersRaw,
  batchErrors,
  batchLogs,
  type BatchStats,
  type StatusHistoryEntry,
} from '@/db/schema';
import { publish } from '@/queue';
import { QUEUES } from '@/queue/types';
import { nanoid } from 'nanoid';

type BatchStatus =
  | 'UPLOADED'
  | 'VALIDATING'
  | 'RESOLVING'
  | 'ORDERING'
  | 'MESSAGING'
  | 'COMPLETE'
  | 'PARTIAL_FAILURE'
  | 'PAUSED'
  | 'CANCELLED'
  | 'FAILED';

const ADVANCE_MAP: Partial<Record<BatchStatus, BatchStatus>> = {
  UPLOADED: 'VALIDATING',
  VALIDATING: 'RESOLVING',
  RESOLVING: 'ORDERING',
  ORDERING: 'MESSAGING',
  MESSAGING: 'COMPLETE',
};

export class BatchService {
  static async list(params: {
    page: number;
    pageSize: number;
    status?: string;
  }) {
    const offset = (params.page - 1) * params.pageSize;
    const where = params.status ? eq(batches.status, params.status as BatchStatus) : undefined;

    const [rows, countResult] = await Promise.all([
      db.query.batches.findMany({
        where,
        orderBy: [desc(batches.createdAt)],
        limit: params.pageSize,
        offset,
      }),
      db.select({ total: count() }).from(batches).where(where),
    ]);

    const total = Number(countResult[0]?.total ?? 0);

    return {
      data: rows,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    };
  }

  static async getById(id: string) {
    return db.query.batches.findFirst({ where: eq(batches.id, id) });
  }

  static async create(fileName?: string) {
    const id = `batch_${nanoid(12)}`;
    const rows = await db
      .insert(batches)
      .values({ id, fileName, status: 'UPLOADED' })
      .returning();
    const batch = rows[0];
    if (!batch) throw new Error('Failed to create batch');
    return batch;
  }

  static async advance(batchId: string, trigger: string) {
    const batch = await this.getById(batchId);
    if (!batch) throw new Error(`Batch ${batchId} not found`);

    const status = batch.status as BatchStatus;
    const next = ADVANCE_MAP[status];
    if (!next) throw new Error(`Cannot advance batch from ${status}`);

    return this.transition(batchId, batch, next, trigger);
  }

  static async pause(batchId: string) {
    const batch = await this.getById(batchId);
    if (!batch) throw new Error(`Batch ${batchId} not found`);
    if (batch.status === 'PAUSED') return batch;

    const rows = await db
      .update(batches)
      .set({
        status: 'PAUSED',
        pausedFromStage: batch.status,
        pausedAt: new Date(),
        statusHistory: [
          ...(batch.statusHistory ?? []),
          { from: batch.status, to: 'PAUSED', trigger: 'manual', timestamp: new Date().toISOString() },
        ],
        updatedAt: new Date(),
      })
      .where(eq(batches.id, batchId))
      .returning();
    const updated = rows[0];
    if (!updated) throw new Error('Failed to pause batch');
    return updated;
  }

  static async resume(batchId: string) {
    const batch = await this.getById(batchId);
    if (!batch) throw new Error(`Batch ${batchId} not found`);
    if (batch.status !== 'PAUSED') throw new Error('Batch is not paused');

    const resumeTarget = (batch.pausedFromStage ?? 'MESSAGING') as BatchStatus;
    return this.transition(batchId, batch, resumeTarget, 'manual_resume');
  }

  static async cancel(batchId: string, reason?: string) {
    const batch = await this.getById(batchId);
    if (!batch) throw new Error(`Batch ${batchId} not found`);

    const rows = await db
      .update(batches)
      .set({
        status: 'CANCELLED',
        cancelReason: reason ?? 'Cancelled by admin',
        cancelledAt: new Date(),
        statusHistory: [
          ...(batch.statusHistory ?? []),
          { from: batch.status, to: 'CANCELLED', trigger: 'manual', timestamp: new Date().toISOString() },
        ],
        updatedAt: new Date(),
      })
      .where(eq(batches.id, batchId))
      .returning();
    const updated = rows[0];
    if (!updated) throw new Error('Failed to cancel batch');
    return updated;
  }

  static async updateStats(batchId: string, statsUpdate: Partial<BatchStats>) {
    const batch = await this.getById(batchId);
    if (!batch) return;

    const merged = { ...(batch.stats ?? {}), ...statsUpdate };
    await db
      .update(batches)
      .set({ stats: merged, updatedAt: new Date() })
      .where(eq(batches.id, batchId));
  }

  static async getTeachers(batchId: string, params: { page: number; pageSize: number; status?: string }) {
    const offset = (params.page - 1) * params.pageSize;
    const conditions = [eq(teachersRaw.batchId, batchId)];
    if (params.status) {
      conditions.push(eq(teachersRaw.resolutionStatus, params.status as 'PENDING' | 'RESOLVED' | 'FAILED'));
    }

    const where = and(...conditions);
    const [rows, countResult] = await Promise.all([
      db.query.teachersRaw.findMany({
        where,
        orderBy: [desc(teachersRaw.createdAt)],
        limit: params.pageSize,
        offset,
      }),
      db.select({ total: count() }).from(teachersRaw).where(where),
    ]);

    const total = Number(countResult[0]?.total ?? 0);

    return {
      data: rows,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    };
  }

  static async getErrors(batchId: string, params: { page: number; pageSize: number; stage?: string }) {
    const offset = (params.page - 1) * params.pageSize;
    const conditions = [eq(batchErrors.batchId, batchId)];
    if (params.stage) {
      conditions.push(eq(batchErrors.stage, params.stage as 'RESOLUTION' | 'ORDERS' | 'AGGREGATION' | 'MESSAGES'));
    }

    const where = and(...conditions);
    const [rows, countResult] = await Promise.all([
      db.select().from(batchErrors).where(where).orderBy(desc(batchErrors.createdAt)).limit(params.pageSize).offset(offset),
      db.select({ total: count() }).from(batchErrors).where(where),
    ]);

    const total = Number(countResult[0]?.total ?? 0);

    return {
      data: rows,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    };
  }

  static async retryErrors(batchId: string, stage?: string) {
    const conditions = [eq(batchErrors.batchId, batchId), eq(batchErrors.isRetryable, true)];
    if (stage) {
      conditions.push(eq(batchErrors.stage, stage as 'RESOLUTION' | 'ORDERS' | 'AGGREGATION' | 'MESSAGES'));
    }

    const errors = await db.select().from(batchErrors).where(and(...conditions));

    let retriedCount = 0;
    for (const err of errors) {
      if (err.stage === 'MESSAGES' && err.commLogId) {
        await publish(QUEUES.WHATSAPP_MESSAGES, { commLogId: err.commLogId, batchId, retryCount: 0 });
        retriedCount++;
      } else if (err.stage === 'ORDERS' && err.teacherRawId) {
        await publish(QUEUES.ORDER_CREATION, { batchId, teacherRecordId: err.teacherRawId, retryCount: 0 });
        retriedCount++;
      }
    }

    return { retriedCount };
  }

  static async getLogs(batchId: string, params: { page: number; pageSize: number }) {
    const offset = (params.page - 1) * params.pageSize;
    const where = eq(batchLogs.batchId, batchId);

    const [rows, countResult] = await Promise.all([
      db.select().from(batchLogs).where(where).orderBy(desc(batchLogs.loggedAt)).limit(params.pageSize).offset(offset),
      db.select({ total: count() }).from(batchLogs).where(where),
    ]);

    const total = Number(countResult[0]?.total ?? 0);

    return {
      data: rows,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    };
  }

  static async addLog(batchId: string, step: typeof batchLogs.$inferInsert['step'], message: string, detail?: string) {
    await db.insert(batchLogs).values({
      id: nanoid(),
      batchId,
      step,
      message,
      detail,
      loggedAt: new Date(),
    });
  }

  private static async transition(
    batchId: string,
    batch: typeof batches.$inferSelect,
    next: BatchStatus,
    trigger: string
  ) {
    const history: StatusHistoryEntry[] = [
      ...(batch.statusHistory ?? []),
      { from: batch.status, to: next, trigger, timestamp: new Date().toISOString() },
    ];

    const rows = await db
      .update(batches)
      .set({
        status: next,
        statusHistory: history,
        resumedAt: next !== 'PAUSED' && batch.status === 'PAUSED' ? new Date() : batch.resumedAt,
        updatedAt: new Date(),
      })
      .where(eq(batches.id, batchId))
      .returning();

    const updated = rows[0];
    if (!updated) throw new Error('Failed to transition batch');

    await publish(QUEUES.BATCH_ADVANCE, { batchId, targetStage: next });

    return updated;
  }
}
