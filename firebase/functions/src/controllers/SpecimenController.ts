import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import Busboy from 'busboy';
import { parseExcelBuffer, validateRows } from '../utils/excelParser';
import * as BatchRepository from '../repositories/BatchRepository';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import * as AdminActivityLogRepository from '../repositories/AdminActivityLogRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as SpecimenService from '../services/SpecimenService';
import * as LinkGenerationService from '../services/LinkGenerationService';
import * as BatchLinksRepository from '../repositories/BatchLinksRepository';
import { config } from '../config';

// ---------------------------------------------------------------------------
// POST /specimen/upload
// ---------------------------------------------------------------------------

export async function uploadSpecimen(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const fileBuffer = await parseMultipartFile(req);

    if (!fileBuffer || fileBuffer.length === 0) {
      res.status(400).json({ error: 'No file uploaded or file is empty' });
      return;
    }

    // Check file size
    const maxBytes = config.app.maxFileSizeMB * 1024 * 1024;
    if (fileBuffer.length > maxBytes) {
      res.status(400).json({
        error: `File exceeds maximum size of ${config.app.maxFileSizeMB}MB`,
      });
      return;
    }

    // Parse Excel
    const parsedRows = parseExcelBuffer(fileBuffer);
    if (parsedRows.length === 0) {
      res.status(400).json({ error: 'Excel file contains no data rows' });
      return;
    }

    // Validate rows
    const { valid, errors } = validateRows(parsedRows as Array<Record<string, unknown>>);
    if (valid.length === 0) {
      res.status(400).json({
        error: 'No valid rows found in the uploaded file',
        validationErrors: errors,
      });
      return;
    }

    // Create batch record with UPLOADED status
    const batch = await BatchRepository.create({
      status: 'UPLOADED',
      fileName: (req as any).fileName || 'upload.xlsx',
      totalRows: parsedRows.length,
      validRows: valid.length,
      invalidRows: errors.length,
      validationErrors: errors.length > 0 ? errors : [],
      stats: {
        totalTeachers: valid.length,
        teachersResolved: 0,
        resolutionErrors: 0,
        ordersCreated: 0,
        messagesQueued: 0,
        messagesDelivered: 0,
        messagesFailed: 0,
        dlqMessages: 0,
      },
    });

    const batchId = batch.id;

    // Create raw teacher records in bulk
    const rawRecords = valid.map((row) => ({
      batchId,
      name: row.name,
      phone: row.phone,
      email: row.email,
      school: row.school,
      city: row.city || '',
      books: row.books,
      resolutionStatus: 'pending',
    }));

    const created = await TeacherRawRepository.createBatch(rawRecords);
    const teachers = created.map((r: any) => ({
      teacherId: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email,
      school: r.school,
      books: r.books,
    }));

    await AdminActivityLogRepository.append({
      type: 'batch_uploaded',
      batchId,
      teacherCount: valid.length,
      message: `Uploaded ${valid.length} teachers`,
    }).catch((e) => console.error('AdminActivityLog append failed:', e));

    await BatchLogRepository.append(batchId, {
      step: 'upload',
      message: 'Batch uploaded',
      detail: `${valid.length} teachers, ${errors.length} validation errors`,
      metadata: { validRows: valid.length, invalidRows: errors.length, fileName: (req as any).fileName },
    });

    // Auto-start resolution: transition UPLOADED -> VALIDATING -> RESOLVING
    await BatchStateMachine.transitionBatch(batchId, 'VALIDATING', 'upload_auto');
    await BatchStateMachine.transitionBatch(batchId, 'RESOLVING', 'upload_auto');

    res.status(200).json({
      batchId,
      teacherCount: valid.length,
      teachers,
      status: 'RESOLVING',
      validationErrors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error('uploadSpecimen error:', err);
    res.status(500).json({
      error: 'Failed to process specimen upload',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /specimen/upload-reviewed
// Accepts JSON body with pre-reviewed rows (after merge, contact selection, channel selection).
// ---------------------------------------------------------------------------

interface ReviewedRowInput {
  name: string;
  phone: string;
  email: string;
  school: string;
  city?: string;
  books: string;
  phoneSelected?: string;
  emailSelected?: string;
  channels?: 'both' | 'whatsapp' | 'email' | 'none';
  /** When set, teacher already exists in DB (exact match) — create pre-resolved raw record */
  existingTeacherId?: string;
}

export async function uploadReviewed(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body as { rows?: ReviewedRowInput[] };
    const rows = body?.rows;

    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(400).json({ error: 'rows array is required and must not be empty' });
      return;
    }

    // Normalize for validation: use selected contact if provided
    const normalizedForValidation = rows.map((r) => ({
      ...r,
      phone: r.phoneSelected ?? r.phone ?? '',
      email: r.emailSelected ?? r.email ?? '',
    }));
    const { errors } = validateRows(normalizedForValidation as Array<Record<string, unknown>>);
    // Filter the normalized rows (which retain channels/phoneSelected/emailSelected) by removing invalid ones
    const invalidRowNumbers = new Set(errors.map((e) => e.row));
    const validNormalized = normalizedForValidation.filter((_, idx) => !invalidRowNumbers.has(idx + 2));

    if (validNormalized.length === 0) {
      res.status(400).json({
        error: 'No valid rows found',
        validationErrors: errors,
      });
      return;
    }

    const exactMatchCount = validNormalized.filter((r: any) => !!r.existingTeacherId).length;

    const batch = await BatchRepository.create({
      status: 'UPLOADED',
      fileName: 'reviewed-upload.json',
      totalRows: rows.length,
      validRows: validNormalized.length,
      invalidRows: errors.length,
      validationErrors: errors.length > 0 ? errors : [],
      stats: {
        totalTeachers: validNormalized.length,
        teachersResolved: exactMatchCount,
        resolutionErrors: 0,
        ordersCreated: 0,
        messagesQueued: 0,
        messagesDelivered: 0,
        messagesFailed: 0,
        dlqMessages: 0,
      },
    });

    const batchId = batch.id;

    const channelCounts = { both: 0, whatsapp: 0, email: 0, none: 0 };
    const rawRecords = validNormalized.map((row: any) => {
      const channels = (row.channels || 'both') as 'both' | 'whatsapp' | 'email' | 'none';
      channelCounts[channels] = (channelCounts[channels] || 0) + 1;
      const phone = row.phoneSelected ?? row.phone ?? '';
      const email = row.emailSelected ?? row.email ?? '';
      const sendWhatsApp = channels === 'both' || channels === 'whatsapp';
      const sendEmail = channels === 'both' || channels === 'email';
      const existingTeacherId = row.existingTeacherId as string | undefined;
      const isExactMatch = !!existingTeacherId;
      const base = {
        batchId,
        name: row.name,
        phone,
        email,
        school: row.school,
        city: row.city || '',
        books: row.books,
        resolutionStatus: isExactMatch ? 'resolved' : 'pending',
        sendWhatsApp: channels !== 'none' && sendWhatsApp,
        sendEmail: channels !== 'none' && sendEmail,
      };
      if (isExactMatch && existingTeacherId) {
        return {
          ...base,
          teacherMasterId: existingTeacherId,
          isNewTeacher: false,
          resolutionConfidence: 100,
        };
      }
      return base;
    });

    const created = await TeacherRawRepository.createBatch(rawRecords);
    console.log(`uploadReviewed: batch ${batchId} channel distribution:`, channelCounts);

    const teachers = created.map((r: any) => ({
      teacherId: r.id,
      name: r.name,
      phone: r.phone,
      email: r.email,
      school: r.school,
      books: r.books,
    }));

    await AdminActivityLogRepository.append({
      type: 'batch_reviewed_upload',
      batchId,
      teacherCount: validNormalized.length,
      message: `Uploaded ${validNormalized.length} teachers (channels: ${JSON.stringify(channelCounts)})`,
      metadata: { channelCounts },
    }).catch((e) => console.error('AdminActivityLog append failed:', e));

    await BatchLogRepository.append(batchId, {
      step: 'upload',
      message: 'Batch uploaded (reviewed)',
      detail: `${validNormalized.length} teachers from reviewed data`,
      metadata: { validRows: validNormalized.length, invalidRows: errors.length },
    });

    await BatchStateMachine.transitionBatch(batchId, 'VALIDATING', 'upload_auto');
    await BatchStateMachine.transitionBatch(batchId, 'RESOLVING', 'upload_auto');

    res.status(200).json({
      batchId,
      teacherCount: validNormalized.length,
      teachers,
      status: 'RESOLVING',
      validationErrors: errors.length > 0 ? errors : undefined,
    });
  } catch (err) {
    console.error('uploadReviewed error:', err);
    res.status(500).json({
      error: 'Failed to process reviewed upload',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /specimenCreateOrders
//
// Request payload:
//   { "batchId": "<batch-id>" }
//
// Internally builds:
//   { batchId, teachers: Record<teacherRecordId, Record<productId, count>> }
// and calls the Order API (external or local emulator fallback).
//
// Success response (200):
//   {
//     "batchId": "...",
//     "batchStatus": "ORDERING",
//     "totalTeachers": 30,
//     "resolvedTeachers": 28,
//     "skippedTeachers": 2,
//     "ordersCreated": 28,
//     "message": "28 orders created via Order API"
//   }
//
// Error responses:
//   400 — batchId missing or invalid
//   404 — batch not found
//   500 — internal error
// ---------------------------------------------------------------------------

export async function createOrders(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { batchId } = req.body;

    if (!batchId || typeof batchId !== 'string') {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }

    const batch = await BatchRepository.getById(batchId);
    if (!batch) {
      res.status(404).json({ error: `Batch ${batchId} not found` });
      return;
    }

    const result = await SpecimenService.createOrdersForBatch(batchId);

    res.status(200).json({
      batchId,
      batchStatus: (batch as any).status,
      totalTeachers: result.totalTeachers,
      resolvedTeachers: result.resolvedTeachers,
      skippedTeachers: result.skippedTeachers,
      ordersCreated: result.ordersToCreate,
      message: `${result.ordersToCreate} order${result.ordersToCreate !== 1 ? 's' : ''} created via Order API`,
    });
  } catch (err) {
    console.error('createOrders error:', err);
    res.status(500).json({
      error: 'Failed to create orders',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /specimen/generate-links
// Payload: { batchId, teacherProducts: { teacherId: { productId: qty } } }
// Response: { batchId, links: { teacherId: { productId: [url, ...] } }, expiresAt, savedTo, savedDocId }
// ---------------------------------------------------------------------------

export async function generateLinks(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body as { batchId?: string; teacherProducts?: Record<string, Record<string, number>> };
    const { batchId, teacherProducts } = body;

    if (!batchId || typeof batchId !== 'string') {
      res.status(400).json({ error: 'batchId is required' });
      return;
    }
    if (!teacherProducts || typeof teacherProducts !== 'object') {
      res.status(400).json({ error: 'teacherProducts is required (object: teacherId -> { productId -> qty })' });
      return;
    }

    const result = await LinkGenerationService.generateLinks({ batchId, teacherProducts });
    res.status(200).json(result);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('not found')) {
      res.status(404).json({ error: msg });
      return;
    }
    console.error('generateLinks error:', err);
    res.status(500).json({ error: 'Failed to generate links', details: msg });
  }
}

// ---------------------------------------------------------------------------
// GET /specimen/batch-links?batchId=xxx — fetch saved links for a batch
// ---------------------------------------------------------------------------

export async function getBatchLinks(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const batchId = (req.query.batchId as string)?.trim();
    if (!batchId) {
      res.status(400).json({ error: 'batchId query param is required' });
      return;
    }

    const doc = await BatchLinksRepository.getByBatchId(batchId);
    if (!doc) {
      res.status(404).json({ error: `No links found for batch ${batchId}` });
      return;
    }

    res.status(200).json(doc);
  } catch (err) {
    console.error('getBatchLinks error:', err);
    res.status(500).json({
      error: 'Failed to fetch batch links',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse a multipart/form-data request and extract the first file as a Buffer.
 * Uses rawBody when available (production); buffers stream in emulator where rawBody may be empty.
 */
async function parseMultipartFile(req: Request): Promise<Buffer> {
  const busboy = Busboy({ headers: req.headers });
  const chunks: Buffer[] = [];
  let fileName = 'upload.xlsx';

  busboy.on(
    'file',
    (_fieldname: string, file: NodeJS.ReadableStream, info: { filename: string }) => {
      fileName = info.filename || 'upload.xlsx';
      file.on('data', (data: Buffer) => chunks.push(data));
    },
  );

  const body = await getRequestBody(req);
  return new Promise((resolve, reject) => {
    busboy.on('finish', () => {
      (req as any).fileName = fileName;
      resolve(Buffer.concat(chunks));
    });
    busboy.on('error', reject);
    busboy.end(body);
  });
}

async function getRequestBody(req: Request): Promise<Buffer> {
  const rawBody = (req as any).rawBody;
  if (rawBody && Buffer.isBuffer(rawBody) && rawBody.length > 0) {
    return rawBody;
  }
  return streamToBuffer(req);
}

/** Read request body stream into a Buffer (for emulator when rawBody is empty). */
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk: Buffer) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}
