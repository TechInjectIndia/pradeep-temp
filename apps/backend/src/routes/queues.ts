import { Elysia } from 'elysia';
import { QUEUES } from '@/queue';
import { db } from '@/db';
import { failedMessages } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export const queueRoutes = new Elysia({ prefix: '/queues' })

  .get('/stats', async () => {
    // Get real failed counts from DB — BullMQ getJobCounts() is unreliable
    const failedCounts = await db
      .select({
        channel: failedMessages.channel,
        count: sql<number>`COUNT(*)::int`,
      })
      .from(failedMessages)
      .where(eq(failedMessages.status, 'FAILED'))
      .groupBy(failedMessages.channel);

    const failedMap: Record<string, number> = {};
    for (const row of failedCounts) {
      if (row.channel) failedMap[row.channel] = row.count;
    }

    // BullMQ counts for completed/active/waiting (informational only)
    const queueNames = Object.values(QUEUES) as string[];
    const results = await Promise.allSettled(
      queueNames.map(async (name) => {
        try {
          const { Queue } = await import('bullmq');
          const queue = new Queue(name, { connection: { host: 'localhost', port: 6379 } });
          const counts = await queue.getJobCounts();
          queue.close();
          return { name, counts, error: null, dbFailed: failedMap[name] ?? 0 };
        } catch (err) {
          return { name, counts: null, error: (err as Error).message, dbFailed: failedMap[name] ?? 0 };
        }
      })
    );
    return results.map((r, i) => ({
      name: queueNames[i],
      dbFailed: failedMap[queueNames[i]] ?? 0,
      ...(r.status === 'fulfilled' ? r.value : { counts: null, error: r.reason?.message ?? 'unknown' }),
    }));
  });
