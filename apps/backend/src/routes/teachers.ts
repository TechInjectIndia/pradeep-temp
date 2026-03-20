import { Elysia, t } from 'elysia';
import { TeacherService } from '@/services/TeacherService';

export const teacherRoutes = new Elysia({ prefix: '/teachers' })
  .get(
    '/',
    ({ query }) =>
      TeacherService.list({
        page: query.page ?? 1,
        pageSize: query.pageSize ?? 20,
        search: query.search,
      }),
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
        pageSize: t.Optional(t.Numeric({ minimum: 1, maximum: 200, default: 20 })),
        search: t.Optional(t.String()),
      }),
    }
  )
  .get('/:id', async ({ params, set }) => {
    const teacher = await TeacherService.getById(params.id);
    if (!teacher) { set.status = 404; return { message: 'Teacher not found' }; }
    return teacher;
  })
  .post(
    '/check-duplicates',
    async ({ body, set }) => {
      try {
        return await TeacherService.checkDuplicates(body.rows);
      } catch (e) {
        set.status = 400;
        return { message: e instanceof Error ? e.message : 'Duplicate check failed' };
      }
    },
    {
      body: t.Object({
        rows: t.Array(t.Object({
          name: t.String(),
          phone: t.String(),
          email: t.String(),
          school: t.String(),
        })),
      }),
    }
  );
