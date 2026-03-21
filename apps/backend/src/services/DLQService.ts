import { eq, and, desc, count, inArray } from 'drizzle-orm';
import { db } from '@/db';
import { failedMessages } from '@/db/schema';
import { addJob, QUEUES } from '@/queue';

export class DLQService {
  static async list(params: {
    page: number;
    pageSize: number;
    batchId?: string;
    channel?: string;
    status?: string;
  }) {
    const offset = (params.page - 1) * params.pageSize;
    const conditions = [];
    if (params.batchId) conditions.push(eq(failedMessages.batchId, params.batchId));
    if (params.channel) conditions.push(eq(failedMessages.channel, params.channel as 'WHATSAPP' | 'EMAIL'));
    if (params.status) conditions.push(eq(failedMessages.status, params.status as 'FAILED' | 'RETRYING' | 'RESOLVED'));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, countResult] = await Promise.all([
      db.select().from(failedMessages).where(where).orderBy(desc(failedMessages.createdAt)).limit(params.pageSize).offset(offset),
      db.select({ total: count() }).from(failedMessages).where(where),
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

  static async retry(ids: string[]) {
    if (ids.length === 0) return { retriedCount: 0, skippedCount: 0 };

    const messages = await db
      .select()
      .from(failedMessages)
      .where(and(inArray(failedMessages.id, ids), eq(failedMessages.isRetryable, true)));

    const skippedCount = ids.length - messages.length;
    let retriedCount = 0;

    for (const msg of messages) {
      const queue = msg.channel === 'WHATSAPP' ? QUEUES.WHATSAPP_MESSAGES : QUEUES.EMAIL_MESSAGES;
      await addJob(queue, {
        type: msg.channel,
        batchId: msg.batchId,
        teacherRecordId: msg.teacherRecordId,
        teacherMasterId: msg.teacherMasterId,
        phone: msg.teacherPhone,
        email: msg.teacherEmail,
        commLogId: msg.commLogId,
        retryCount: msg.attemptCount,
      });

      await db
        .update(failedMessages)
        .set({ status: 'RETRYING', retriedAt: new Date(), updatedAt: new Date() })
        .where(eq(failedMessages.id, msg.id));

      retriedCount++;
    }

    return { retriedCount, skippedCount };
  }

  static async retryAll(batchId?: string) {
    const conditions = [eq(failedMessages.isRetryable, true), eq(failedMessages.status, 'FAILED')];
    if (batchId) conditions.push(eq(failedMessages.batchId, batchId));

    const messages = await db
      .select()
      .from(failedMessages)
      .where(and(...conditions))
      .limit(500);

    return this.retry(messages.map((m) => m.id));
  }
}
