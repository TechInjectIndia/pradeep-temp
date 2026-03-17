import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import Busboy from 'busboy';
import { parseExcelBuffer, validateRows } from '../utils/excelParser';
import * as BatchRepository from '../repositories/BatchRepository';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as SpecimenService from '../services/SpecimenService';
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

    await TeacherRawRepository.createBatch(rawRecords);

    // Auto-start resolution: transition UPLOADED -> VALIDATING -> RESOLVING
    await BatchStateMachine.transitionBatch(batchId, 'VALIDATING', 'upload_auto');
    await BatchStateMachine.transitionBatch(batchId, 'RESOLVING', 'upload_auto');

    res.status(200).json({
      batchId,
      teacherCount: valid.length,
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
// POST /specimen/create-orders
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
      ordersToCreate: result.ordersToCreate,
      status: (batch as any).status,
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
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse a multipart/form-data request and extract the first file as a Buffer.
 * Firebase Cloud Functions v2 uses raw body, so we use busboy to parse it.
 */
function parseMultipartFile(req: Request): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({ headers: req.headers });
    const chunks: Buffer[] = [];
    let fileName = '';

    busboy.on(
      'file',
      (_fieldname: string, file: NodeJS.ReadableStream, info: { filename: string }) => {
        fileName = info.filename || 'upload.xlsx';
        file.on('data', (data: Buffer) => {
          chunks.push(data);
        });
      },
    );

    busboy.on('finish', () => {
      (req as any).fileName = fileName;
      resolve(Buffer.concat(chunks));
    });

    busboy.on('error', (err: Error) => {
      reject(err);
    });

    // If rawBody is available (Firebase Functions), pipe that; otherwise pipe req
    if ((req as any).rawBody) {
      busboy.end((req as any).rawBody);
    } else {
      req.pipe(busboy);
    }
  });
}
