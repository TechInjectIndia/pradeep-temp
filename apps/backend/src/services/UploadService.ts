import * as XLSX from 'xlsx';
import { db } from '@/db';
import { teachersRaw, teachers, phoneLookup, emailLookup } from '@/db/schema';
import { BatchService } from './BatchService';
import { nanoid } from 'nanoid';
import { eq, inArray } from 'drizzle-orm';

export type MergeDecisionPayload =
  | {
      rowIndex: number;
      action: 'merge';
      teacherId: string;
      nameChoice: 'file' | 'db';
      noChanges: boolean;
      phonesToAdd: string[];
      emailsToAdd: string[];
      newName?: string;
    }
  | { rowIndex: number; action: 'create_new' };

export type UploadRow = {
  name?: string;
  phone?: string;
  email?: string;
  school?: string;
  city?: string;
  books?: string;
  recordId?: string;
  booksAssigned?: string;
  teacherOwnerId?: string;
  teacherOwner?: string;
  firstName?: string;
  lastName?: string;
  institutionId?: string;
  institutionName?: string;
  salutation?: string;
  sendWhatsApp?: boolean;
  sendEmail?: boolean;
};

const COLUMN_ALIASES: Record<string, keyof UploadRow> = {
  name: 'name',
  teacher_name: 'name',
  teachername: 'name',
  'teacher name': 'name',
  phone: 'phone',
  mobile: 'phone',
  'mobile no': 'phone',
  'phone no': 'phone',
  phoneno: 'phone',
  email: 'email',
  'email id': 'email',
  emailid: 'email',
  school: 'school',
  'school name': 'school',
  schoolname: 'school',
  city: 'city',
  location: 'city',
  books: 'books',
  'book list': 'books',
  booklist: 'books',
  record_id: 'recordId',
  recordid: 'recordId',
  'record id': 'recordId',
  books_assigned: 'booksAssigned',
  booksassigned: 'booksAssigned',
  'books assigned': 'booksAssigned',
  teacher_owner_id: 'teacherOwnerId',
  teacherownerid: 'teacherOwnerId',
  'teacher owner id': 'teacherOwnerId',
  teacher_owner: 'teacherOwner',
  teacherowner: 'teacherOwner',
  'teacher owner': 'teacherOwner',
  first_name: 'firstName',
  firstname: 'firstName',
  'first name': 'firstName',
  last_name: 'lastName',
  lastname: 'lastName',
  'last name': 'lastName',
  institution_id: 'institutionId',
  institutionid: 'institutionId',
  'institution id': 'institutionId',
  'institution name.id': 'institutionId',
  'instituition name.id': 'institutionId',
  "instituition's__id": 'institutionId',
  institution_name: 'institutionName',
  institutionname: 'institutionName',
  'institution name': 'institutionName',
  'instituition name': 'institutionName',
  instituitionname: 'institutionName',
  salutation: 'salutation',
  title: 'salutation',
  send_whatsapp: 'sendWhatsApp',
  sendwhatsapp: 'sendWhatsApp',
  'send whatsapp': 'sendWhatsApp',
  send_email: 'sendEmail',
  sendemail: 'sendEmail',
  'send email': 'sendEmail',
};

function normalizeKey(key: string): string {
  return key.toLowerCase().replace(/[-\s]+/g, '_').trim();
}

export function parseExcelBuffer(buffer: Buffer): UploadRow[] {
  const wb = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = wb.SheetNames[0];
  if (!sheetName) throw new Error('No sheets found in workbook');

  const sheet = wb.Sheets[sheetName];
  if (!sheet) throw new Error('Empty sheet');

  const raw = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' });

  return raw.map((row) => {
    const mapped: UploadRow = {};
    for (const [rawKey, value] of Object.entries(row)) {
      const normalized = normalizeKey(rawKey);
      const alias = COLUMN_ALIASES[normalized] ?? COLUMN_ALIASES[rawKey.toLowerCase()];
      if (alias) {
        if (alias === 'sendWhatsApp' || alias === 'sendEmail') {
          (mapped as Record<string, unknown>)[alias] =
            value === true || value === 1 || value === 'true' || value === 'yes' || value === 'YES';
        } else {
          (mapped as Record<string, unknown>)[alias] = String(value).trim();
        }
      }
    }
    return mapped;
  });
}

export async function processUpload(
  buffer: Buffer,
  fileName: string,
  channel?: 'whatsapp' | 'email' | 'both',
  teacherChannels?: ('whatsapp' | 'email' | 'both')[],
  mergeDecisions?: MergeDecisionPayload[],
  skippedRowIndices?: number[]
): Promise<{ batchId: string; rowCount: number }> {
  const allRows = parseExcelBuffer(buffer);
  if (allRows.length === 0) throw new Error('No data rows found in file');

  // Filter out rows skipped by admin during in-sheet duplicate review
  const skippedSet = new Set(skippedRowIndices ?? []);
  const rows = skippedSet.size > 0
    ? allRows.filter((_, idx) => !skippedSet.has(idx))
    : allRows;

  if (rows.length === 0) throw new Error('All rows were skipped — no data to upload');

  const batch = await BatchService.create(fileName);

  // Build a lookup from rowIndex → merge decision
  // Note: rowIndices in mergeDecisions refer to original file indices (pre-skip)
  // But teacherChannels are aligned to original indices too
  // We need to map original idx → compressed idx for the active rows
  const originalToActive = new Map<number, number>();
  let activeIdx = 0;
  for (let i = 0; i < allRows.length; i++) {
    if (!skippedSet.has(i)) {
      originalToActive.set(i, activeIdx++);
    }
  }

  const decisionMap = new Map<number, MergeDecisionPayload>();
  if (mergeDecisions) {
    for (const d of mergeDecisions) {
      // mergeDecisions use original rowIndex — remap to active index
      const activeI = originalToActive.get(d.rowIndex);
      if (activeI !== undefined) {
        decisionMap.set(activeI, { ...d, rowIndex: activeI });
      }
    }
  }

  // Remap teacherChannels (originally aligned to all rows) to active rows only
  type Channel = 'whatsapp' | 'email' | 'both';
  const activeTeacherChannels: Channel[] | undefined = teacherChannels
    ? Array.from(originalToActive.entries())
        .sort((a, b) => a[1] - b[1])
        .map(([origIdx]) => (teacherChannels[origIdx] ?? 'both') as Channel)
    : undefined;

  const rawRecords = rows.map((row, idx) => {
    const effectiveChannel = activeTeacherChannels?.[idx] ?? channel;
    let sendWhatsApp: boolean;
    let sendEmail: boolean;

    if (effectiveChannel === 'whatsapp') {
      sendWhatsApp = true;
      sendEmail = false;
    } else if (effectiveChannel === 'email') {
      sendWhatsApp = false;
      sendEmail = true;
    } else if (effectiveChannel === 'both') {
      sendWhatsApp = true;
      sendEmail = true;
    } else {
      sendWhatsApp = row.sendWhatsApp ?? true;
      sendEmail = row.sendEmail ?? false;
    }

    const decision = decisionMap.get(idx);
    const isMerge = decision?.action === 'merge';

    return {
      id: `tr_${nanoid(12)}`,
      batchId: batch.id,
      name: row.name ?? '',
      phone: row.phone,
      email: row.email,
      school: row.school || row.institutionName || '',
      city: row.city,
      books: row.books ?? row.booksAssigned,
      recordId: row.recordId,
      booksAssigned: row.booksAssigned,
      teacherOwnerId: row.teacherOwnerId,
      teacherOwner: row.teacherOwner,
      firstName: row.firstName,
      lastName: row.lastName,
      institutionId: row.institutionId,
      institutionName: row.institutionName,
      salutation: row.salutation,
      sendWhatsApp,
      sendEmail,
      // Pre-resolve approved merges so the ordering worker skips upsert
      resolutionStatus: isMerge ? ('RESOLVED' as const) : ('PENDING' as const),
      teacherMasterId: isMerge ? (decision as Extract<MergeDecisionPayload, { action: 'merge' }>).teacherId : undefined,
    };
  });

  for (let i = 0; i < rawRecords.length; i += 500) {
    await db.insert(teachersRaw).values(rawRecords.slice(i, i + 500));
  }

  // Apply teacher master updates for approved merges (phones, emails, name)
  // noChanges rows: nothing to update — just linked above
  const mergeUpdates = mergeDecisions?.filter(
    (d): d is Extract<MergeDecisionPayload, { action: 'merge' }> =>
      d.action === 'merge' && !d.noChanges
  ) ?? [];

  if (mergeUpdates.length > 0) {
    // Fetch all affected teachers in one query
    const teacherIds = [...new Set(mergeUpdates.map((d) => d.teacherId))];
    const existingTeachers = await db.query.teachers.findMany({
      where: inArray(teachers.id, teacherIds),
    });
    const teacherMap = new Map(existingTeachers.map((t) => [t.id, t]));

    // Build all updates in parallel — each teacher has different data so can't batch into one query
    const allPhoneLookups: { phone: string; teacherId: string }[] = [];
    const allEmailLookups: { email: string; teacherId: string }[] = [];
    const teacherUpdatePromises: Promise<unknown>[] = [];

    for (const decision of mergeUpdates) {
      const existing = teacherMap.get(decision.teacherId);
      if (!existing) continue;

      const phones = new Set(existing.phones);
      const emails = new Set(existing.emails);
      for (const p of decision.phonesToAdd) phones.add(p);
      for (const e of decision.emailsToAdd) emails.add(e);

      const updatePayload: Partial<typeof teachers.$inferInsert> = {
        phones: [...phones],
        emails: [...emails],
        updatedAt: new Date(),
      };
      if (decision.nameChoice === 'file' && decision.newName) {
        updatePayload.name = decision.newName;
      }

      teacherUpdatePromises.push(
        db.update(teachers).set(updatePayload).where(eq(teachers.id, decision.teacherId))
      );

      for (const p of decision.phonesToAdd) {
        allPhoneLookups.push({ phone: p, teacherId: decision.teacherId });
      }
      for (const e of decision.emailsToAdd) {
        allEmailLookups.push({ email: e, teacherId: decision.teacherId });
      }
    }

    // Flush all teacher updates in parallel
    if (teacherUpdatePromises.length > 0) {
      await Promise.all(teacherUpdatePromises);
    }

    // Bulk insert all phone/email lookups (one query each instead of N queries)
    if (allPhoneLookups.length > 0) {
      await db.insert(phoneLookup).values(allPhoneLookups).onConflictDoNothing();
    }
    if (allEmailLookups.length > 0) {
      await db.insert(emailLookup).values(allEmailLookups).onConflictDoNothing();
    }
  }

  const resolvedCount = mergeDecisions?.filter((d) => d.action === 'merge').length ?? 0;
  await BatchService.updateStats(batch.id, { totalTeachers: rows.length });
  await BatchService.addLog(
    batch.id,
    'upload',
    `Uploaded ${rows.length} teacher records from ${fileName}${resolvedCount > 0 ? ` (${resolvedCount} pre-resolved merges)` : ''}`
  );

  // Auto-advance: kick off the pipeline immediately after upload
  await BatchService.advance(batch.id, 'auto_upload_complete');

  return { batchId: batch.id, rowCount: rows.length };
}
