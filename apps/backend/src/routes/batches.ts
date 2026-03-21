import { Elysia, t } from 'elysia';
import { BatchService } from '@/services/BatchService';
import { LinkService } from '@/services/LinkService';
import { formatBatchId } from '@/utils/ids';

const paginationQuery = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  pageSize: t.Optional(t.Numeric({ minimum: 1, maximum: 200, default: 20 })),
});

export const batchRoutes = new Elysia({ prefix: '/batches' })
  .get(
    '/',
    async ({ query }) => {
      const result = await BatchService.list({
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 20,
        status: query.status,
      });
      return {
        ...result,
        data: result.data.map((b) => ({ ...b, displayId: formatBatchId(b.seqId) })),
      };
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
        pageSize: t.Optional(t.Numeric({ minimum: 1, maximum: 200, default: 20 })),
        status: t.Optional(t.String()),
      }),
    }
  )
  .get('/:id', async ({ params, set }) => {
    const batch = await BatchService.getById(params.id);
    if (!batch) { set.status = 404; return { message: 'Batch not found' }; }
    return { ...batch, displayId: formatBatchId(batch.seqId) };
  })
  .post('/:id/advance', async ({ params, set }) => {
    try {
      return await BatchService.advance(params.id, 'manual');
    } catch (e) {
      set.status = 400;
      return { message: e instanceof Error ? e.message : 'Cannot advance batch' };
    }
  })
  .post('/:id/pause', async ({ params, set }) => {
    try {
      return await BatchService.pause(params.id);
    } catch (e) {
      set.status = 400;
      return { message: e instanceof Error ? e.message : 'Cannot pause batch' };
    }
  })
  .post('/:id/resume', async ({ params, set }) => {
    try {
      return await BatchService.resume(params.id);
    } catch (e) {
      set.status = 400;
      return { message: e instanceof Error ? e.message : 'Cannot resume batch' };
    }
  })
  .post(
    '/:id/cancel',
    async ({ params, body, set }) => {
      try {
        return await BatchService.cancel(params.id, body.reason);
      } catch (e) {
        set.status = 400;
        return { message: e instanceof Error ? e.message : 'Cannot cancel batch' };
      }
    },
    { body: t.Object({ reason: t.Optional(t.String()) }) }
  )
  .get(
    '/:id/teachers',
    ({ params, query }) =>
      BatchService.getTeachers(params.id, {
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 20,
        status: query.status,
      }),
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
        pageSize: t.Optional(t.Numeric({ minimum: 1, maximum: 200, default: 20 })),
        status: t.Optional(t.String()),
      }),
    }
  )
  .get(
    '/:id/errors',
    ({ params, query }) =>
      BatchService.getErrors(params.id, {
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 50,
        stage: query.stage,
      }),
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
        pageSize: t.Optional(t.Numeric({ minimum: 1, maximum: 200, default: 50 })),
        stage: t.Optional(t.String()),
      }),
    }
  )
  .post(
    '/:id/errors/retry',
    ({ params, body }) => BatchService.retryErrors(params.id, body.stage),
    { body: t.Object({ stage: t.Optional(t.String()) }) }
  )
  .get(
    '/:id/logs',
    ({ params, query }) =>
      BatchService.getLogs(params.id, {
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 50,
      }),
    { query: paginationQuery }
  )
  // Generate specimen links via LMS API
  .post('/:id/links', async ({ params, set }) => {
    try {
      const result = await LinkService.generateForBatch(params.id);
      return { batchId: params.id, ...result };
    } catch (e) {
      set.status = 502;
      return { message: e instanceof Error ? e.message : 'Link generation failed' };
    }
  })
  // Get stored links for a batch
  .get('/:id/links', async ({ params, set }) => {
    const record = await LinkService.getForBatch(params.id);
    if (!record) {
      set.status = 404;
      return { message: 'No links generated yet for this batch' };
    }
    return record;
  });
