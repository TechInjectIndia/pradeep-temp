import { Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as admin from 'firebase-admin';
import * as TeacherRepository from '../repositories/TeacherRepository';

function toISOString(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === 'string') return value;
  const ts = value as { seconds?: number; _seconds?: number; toDate?: () => Date };
  if (typeof ts.seconds === 'number') return new Date(ts.seconds * 1000).toISOString();
  if (typeof ts._seconds === 'number') return new Date(ts._seconds * 1000).toISOString();
  if (typeof ts.toDate === 'function') return ts.toDate().toISOString();
  return undefined;
}

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
