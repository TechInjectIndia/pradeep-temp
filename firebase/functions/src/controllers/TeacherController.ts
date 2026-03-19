import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as admin from 'firebase-admin';
import * as TeacherRepository from '../repositories/TeacherRepository';
import * as TeacherService from '../services/TeacherService';

function toISOString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  const ts = value as { seconds?: number; _seconds?: number; toDate?: () => Date };
  if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000).toISOString();
  if (typeof ts._seconds === 'number') return new Date(ts._seconds * 1000).toISOString();
  if (typeof ts.toDate === 'function') return ts.toDate().toISOString();
  return undefined;
}

// ---------------------------------------------------------------------------
// POST /teachersCheckDuplicates
// Pre-upload check: are any of these rows already in the teacher master DB?
// ---------------------------------------------------------------------------

export async function checkDuplicates(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { rows } = req.body as {
      rows?: Array<{ name: string; phone: string; email: string; school: string }>;
    };

    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(400).json({ error: 'rows array is required and must not be empty' });
      return;
    }

    if (rows.length > 500) {
      res.status(400).json({ error: 'Maximum 500 rows per request' });
      return;
    }

    const matches = await TeacherService.checkDuplicatesForUpload(rows);
    res.status(200).json({ matches, total: matches.length });
  } catch (err) {
    console.error('checkDuplicates error:', err);
    res.status(500).json({
      error: 'Failed to check duplicates',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}

// ---------------------------------------------------------------------------
// POST /teachersMerge
// Persist merged teacher data when user confirms merge in the review modal.
// ---------------------------------------------------------------------------

export async function mergeTeacher(req: Request, res: Response): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const body = req.body as {
      teacherId?: string;
      name?: string;
      phones?: string[];
      emails?: string[];
    };

    const { teacherId, name, phones, emails } = body;

    if (!teacherId || typeof teacherId !== 'string') {
      res.status(400).json({ error: 'teacherId is required' });
      return;
    }
    if (!Array.isArray(phones) || !Array.isArray(emails)) {
      res.status(400).json({ error: 'phones and emails must be arrays' });
      return;
    }

    await TeacherService.mergeTeacherProfile({
      teacherId,
      name,
      phones,
      emails,
    });

    res.status(200).json({ success: true, teacherId });
  } catch (err) {
    console.error('mergeTeacher error:', err);
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('not found')) {
      res.status(404).json({ error: msg });
      return;
    }
    res.status(500).json({
      error: 'Failed to merge teacher',
      details: msg,
    });
  }
}

// ---------------------------------------------------------------------------
// GET /teachersList
// ---------------------------------------------------------------------------

export async function listTeachers(req: Request, res: Response): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const db = admin.firestore();
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;

    const [teachers, totalSnap] = await Promise.all([
      TeacherRepository.listPaginated(pageSize, page),
      db.collection('teachers_master').count().get(),
    ]);

    const total = totalSnap.data().count;

    const data = teachers.map((t) => {
      const row = t as Record<string, unknown>;
      const phones = (row.phones as string[]) || [];
      const emails = (row.emails as string[]) || [];
      return {
        ...row,
        phones,
        emails,
        phone: phones[0] ?? '',
        email: emails[0] ?? '',
        createdAt: toISOString(row.createdAt) ?? row.createdAt,
        updatedAt: toISOString(row.updatedAt) ?? row.updatedAt,
      };
    });

    res.status(200).json({
      data,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (err) {
    console.error('listTeachers error:', err);
    res.status(500).json({
      error: 'Failed to list teachers',
      details: err instanceof Error ? err.message : String(err),
    });
  }
}
