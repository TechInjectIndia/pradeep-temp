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
        const rawMd = body.mergeDecisions;
        const mergeDecisions: MergeDecisionPayload[] | undefined = Array.isArray(rawMd)
          ? rawMd as MergeDecisionPayload[]
          : typeof rawMd === 'string'
            ? parseField<MergeDecisionPayload[]>(rawMd, 'mergeDecisions')
            : undefined;
        const rawSk = body.skippedRowIndices;
        const skippedRowIndices: number[] | undefined = Array.isArray(rawSk)
          ? rawSk as number[]
          : typeof rawSk === 'string'
            ? parseField<number[]>(rawSk, 'skippedRowIndices')
            : undefined;
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
        file: t.File(),
        channel: t.Optional(t.String()),
        teacherChannels: t.Optional(t.Union([t.String(), t.Array(t.Any())])),
        mergeDecisions: t.Optional(t.Union([t.String(), t.Array(t.Any())])),
        skippedRowIndices: t.Optional(t.Union([t.String(), t.Array(t.Any())])),
      }),
    }
  );
