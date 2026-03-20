import { Elysia, t } from 'elysia';
import { processUpload, type MergeDecisionPayload } from '@/services/UploadService';

export const uploadRoutes = new Elysia({ prefix: '/upload' })
  .post(
    '/',
    async ({ body, set }) => {
      try {
        const file = body.file;
        const channel = body.channel as 'whatsapp' | 'email' | 'both' | undefined;
        const parseField = <T>(field: string | undefined, name: string): T | undefined => {
          if (!field) return undefined;
          try { return JSON.parse(field) as T; }
          catch (e) { console.warn(`[upload] Failed to parse ${name}:`, e); return undefined; }
        };

        const teacherChannels = parseField<('whatsapp' | 'email' | 'both')[]>(body.teacherChannels, 'teacherChannels');
        const mergeDecisions = parseField<MergeDecisionPayload[]>(body.mergeDecisions, 'mergeDecisions');
        const skippedRowIndices = parseField<number[]>(body.skippedRowIndices, 'skippedRowIndices');
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return await processUpload(buffer, file.name ?? 'upload.xlsx', channel, teacherChannels, mergeDecisions, skippedRowIndices);
      } catch (e) {
        set.status = 400;
        return { message: e instanceof Error ? e.message : 'Upload failed' };
      }
    },
    {
      body: t.Object({
        file: t.File({
          type: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
          ],
        }),
        channel: t.Optional(t.String()),
        teacherChannels: t.Optional(t.String()),
        mergeDecisions: t.Optional(t.String()),
        skippedRowIndices: t.Optional(t.String()),
      }),
    }
  );
