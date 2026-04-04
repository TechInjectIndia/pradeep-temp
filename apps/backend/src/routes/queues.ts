import { Elysia } from 'elysia';
import { QUEUES } from '@/queue';

function getQueue(name: string) {
  const { Queue } = require('bullmq');
  return new Queue(name, { connection: { lazyConnect: true } });
}

export const queueRoutes = new Elysia({ prefix: '/queues' })

  .get('/stats', async () => {
    const queueNames = Object.values(QUEUES) as string[];
    const results = await Promise.allSettled(
      queueNames.map(async (name) => {
        try {
          const queue = getQueue(name);
          const counts = await queue.getJobCounts();
          return { name, counts, error: null };
        } catch (err) {
          return { name, counts: null, error: (err as Error).message };
        }
      })
    );
    return results.map((r, i) => ({
      name: queueNames[i],
      ...(r.status === 'fulfilled' ? r.value : { counts: null, error: r.reason?.message ?? 'unknown' }),
    }));
  });
