import { eq, and, desc, count, inArray } from 'drizzle-orm';
import { db } from '@/db';
import { failedMessages, commLog, orders } from '@/db/schema';
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
      // Look up the original commLog and order to rebuild the full job
      const log = msg.commLogId ? await db.query.commLog.findFirst({ where: eq(commLog.id, msg.commLogId) }) : null;
      const order = log?.teacherRecordId
        ? await db.query.orders.findFirst({ where: eq(orders.teacherRecordId, log.teacherRecordId) })
        : null;

      const teacherName = log?.teacherName ?? order?.teacherName ?? '';
      const loginLink = `https://pradeeppublications.com/digital-content/login?email=${encodeURIComponent(msg.teacherEmail ?? '')}&phone=${encodeURIComponent(msg.teacherPhone ?? '')}`;
      const books = (order?.books ?? []).map((b: any) => ({ title: b.title, specimenUrl: loginLink, productId: b.productId ?? '' }));

      const queue = msg.channel === 'WHATSAPP' ? QUEUES.WHATSAPP_MESSAGES : QUEUES.EMAIL_MESSAGES;

      if (msg.channel === 'WHATSAPP') {
        await addJob(queue, {
          type: 'WHATSAPP',
          batchId: msg.batchId,
          teacherRecordId: msg.teacherRecordId ?? '',
          teacherMasterId: msg.teacherMasterId ?? '',
          phone: msg.teacherPhone ?? '',
          name: teacherName,
          school: order?.school ?? undefined,
          city: order?.city ?? undefined,
          email: msg.teacherEmail ?? undefined,
          specimenDetails: loginLink,
          commLogId: msg.commLogId ?? '',
          retryCount: 0,
          books,
        });
      } else {
        await addJob(queue, {
          type: 'EMAIL',
          batchId: msg.batchId,
          teacherRecordId: msg.teacherRecordId ?? '',
          teacherMasterId: msg.teacherMasterId ?? '',
          email: msg.teacherEmail ?? '',
          name: teacherName,
          specimenDetails: loginLink,
          commLogId: msg.commLogId ?? '',
          retryCount: 0,
        });
      }

      // Reset commLog status back to QUEUED
      if (msg.commLogId) {
        await db.update(commLog)
          .set({ status: 'QUEUED', lastError: null, updatedAt: new Date() })
          .where(eq(commLog.id, msg.commLogId));
      }

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
