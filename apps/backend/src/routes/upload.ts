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

        // Elysia auto-parses JSON strings in multipart bodies, so teacherChannels
        // may arrive as a string (raw JSON) or already-parsed array
        const rawTc = body.teacherChannels;
        const teacherChannels: ('whatsapp' | 'email' | 'both')[] | undefined = Array.isArray(rawTc)
          ? rawTc as ('whatsapp' | 'email' | 'both')[]
          : typeof rawTc === 'string'
            ? parseField<('whatsapp' | 'email' | 'both')[]>(rawTc, 'teacherChannels')
            : undefined;
        const mergeDecisions = parseField<MergeDecisionPayload[]>(body.mergeDecisions as string | undefined, 'mergeDecisions');
        const skippedRowIndices = parseField<number[]>(body.skippedRowIndices as string | undefined, 'skippedRowIndices');
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
        teacherChannels: t.Optional(t.Any()),
        mergeDecisions: t.Optional(t.Any()),
        skippedRowIndices: t.Optional(t.Any()),
      }),
    }
  );
