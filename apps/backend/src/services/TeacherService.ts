import { eq, desc, count, ilike, or, inArray } from 'drizzle-orm';
import { db } from '@/db';
import { teachers, phoneLookup, emailLookup } from '@/db/schema';
import { nanoid } from 'nanoid';

type Teacher = typeof teachers.$inferSelect;

export interface DuplicateMatch {
  rowIndex: number;
  row: { name: string; phone: string; email: string; school: string };
  existingTeacher: {
    id: string;
    name: string;
    phones: string[];
    emails: string[];
    school: string;
    city: string;
  };
  confidence: number;
  matchReasons: string[];
  diff: {
    nameConflict: boolean;       // name in file differs from name in DB
    phonesToAdd: string[];       // phones from file not yet in DB
    emailsToAdd: string[];       // emails from file not yet in DB
    schoolConflict: boolean;     // school differs
    noChanges: boolean;          // everything already in DB, pure duplicate
  };
}

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, '').replace(/^0+/, '');
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export class TeacherService {
  static async list(params: { page: number; pageSize: number; search?: string }) {
    const offset = (params.page - 1) * params.pageSize;
    const where = params.search
      ? or(
          ilike(teachers.name, `%${params.search}%`),
          ilike(teachers.school, `%${params.search}%`),
          ilike(teachers.city, `%${params.search}%`)
        )
      : undefined;

    const [rows, countResult] = await Promise.all([
      db.query.teachers.findMany({
        where,
        orderBy: [desc(teachers.updatedAt)],
        limit: params.pageSize,
        offset,
      }),
      db.select({ total: count() }).from(teachers).where(where),
    ]);

    const total = Number(countResult[0]?.total ?? 0);

    return {
      data: rows,
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages: Math.ceil(total / params.pageSize),
    };
  }

  static async getById(id: string): Promise<Teacher | undefined> {
    return db.query.teachers.findFirst({ where: eq(teachers.id, id) });
  }

  static async findByPhone(phone: string): Promise<Teacher | undefined> {
    const normalized = normalizePhone(phone);
    const lookup = await db.query.phoneLookup.findFirst({
      where: eq(phoneLookup.phone, normalized),
    });
    if (!lookup) return undefined;
    return db.query.teachers.findFirst({ where: eq(teachers.id, lookup.teacherId) });
  }

  static async findByEmail(email: string): Promise<Teacher | undefined> {
    const normalized = normalizeEmail(email);
    const lookup = await db.query.emailLookup.findFirst({
      where: eq(emailLookup.email, normalized),
    });
    if (!lookup) return undefined;
    return db.query.teachers.findFirst({ where: eq(teachers.id, lookup.teacherId) });
  }

  /**
   * Upsert a teacher — find by phone/email or create new.
   * Returns { teacher, isNew }
   */
  static async upsert(data: {
    name: string;
    phone?: string;
    email?: string;
    school?: string;
    city?: string;
    recordId?: string;
    booksAssigned?: string;
    teacherOwnerId?: string;
    teacherOwner?: string;
    firstName?: string;
    lastName?: string;
    salutation?: string;
    institutionId?: string;
    institutionName?: string;
  }): Promise<{ teacher: Teacher; isNew: boolean }> {
    let existing: Teacher | undefined;

    if (data.phone) existing = await this.findByPhone(data.phone);
    if (!existing && data.email) existing = await this.findByEmail(data.email);

    const effectiveSchool = data.school || data.institutionName;

    if (existing) {
      const phones = new Set(existing.phones);
      const emails = new Set(existing.emails);
      if (data.phone) phones.add(normalizePhone(data.phone));
      if (data.email) emails.add(normalizeEmail(data.email));

      const rows = await db
        .update(teachers)
        .set({
          phones: [...phones],
          emails: [...emails],
          school: effectiveSchool ?? existing.school,
          city: data.city ?? existing.city,
          updatedAt: new Date(),
        })
        .where(eq(teachers.id, existing.id))
        .returning();

      const updated = rows[0] ?? existing;
      await this.syncLookups(updated.id, [...phones], [...emails]);

      return { teacher: updated, isNew: false };
    }

    const id = `t_${nanoid(12)}`;
    const phones = data.phone ? [normalizePhone(data.phone)] : [];
    const emails = data.email ? [normalizeEmail(data.email)] : [];

    const rows = await db
      .insert(teachers)
      .values({
        id,
        name: data.name,
        phones,
        emails,
        school: effectiveSchool,
        city: data.city,
        recordId: data.recordId,
        booksAssigned: data.booksAssigned,
        teacherOwnerId: data.teacherOwnerId,
        teacherOwner: data.teacherOwner,
        firstName: data.firstName,
        lastName: data.lastName,
        salutation: data.salutation,
        institutionId: data.institutionId,
        institutionName: data.institutionName,
      })
      .returning();

    const teacher = rows[0];
    if (!teacher) throw new Error('Failed to create teacher');

    await this.syncLookups(id, phones, emails);

    return { teacher, isNew: true };
  }

  /**
   * Batch duplicate check. NEVER auto-merges — every match is returned for admin approval.
   * Confidence: phone=95%, email=90%, fuzzy name+school=60–75%.
   * Each match includes a diff showing exactly what would change on merge.
   */
  static async checkDuplicates(
    rows: { name: string; phone: string; email: string; school: string }[]
  ): Promise<{ matches: DuplicateMatch[]; total: number }> {

    // ---- 1. Batch exact lookups ----
    const rawPhones = [...new Set(rows.map(r => normalizePhone(r.phone)).filter(Boolean))];
    const rawEmails = [...new Set(rows.map(r => normalizeEmail(r.email)).filter(Boolean))];

    const [phoneRows, emailRows] = await Promise.all([
      rawPhones.length > 0 ? db.query.phoneLookup.findMany({ where: inArray(phoneLookup.phone, rawPhones) }) : [],
      rawEmails.length > 0 ? db.query.emailLookup.findMany({ where: inArray(emailLookup.email, rawEmails) }) : [],
    ]);

    const phoneToTeacherId = new Map(phoneRows.map(p => [p.phone, p.teacherId]));
    const emailToTeacherId = new Map(emailRows.map(e => [e.email, e.teacherId]));

    const matchedIds = [...new Set([...phoneToTeacherId.values(), ...emailToTeacherId.values()])];
    const matchedTeachers = matchedIds.length > 0
      ? await db.query.teachers.findMany({ where: inArray(teachers.id, matchedIds) })
      : [];
    const teacherMap = new Map(matchedTeachers.map(t => [t.id, t]));

    // ---- 2. Build matches with diff ----
    const matches: DuplicateMatch[] = [];
    const unmatchedIdxs: number[] = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]!;
      const normPhone = normalizePhone(row.phone);
      const normEmail = normalizeEmail(row.email);
      let teacherId: string | undefined;
      let confidence = 0;
      const matchReasons: string[] = [];

      if (normPhone) {
        const tid = phoneToTeacherId.get(normPhone);
        if (tid) { teacherId = tid; confidence = 95; matchReasons.push('Phone match'); }
      }
      if (normEmail) {
        const tid = emailToTeacherId.get(normEmail);
        if (tid) {
          if (!teacherId) { teacherId = tid; }
          if (confidence < 90) confidence = 90;
          matchReasons.push('Email match');
        }
      }

      if (teacherId) {
        const teacher = teacherMap.get(teacherId);
        if (teacher) {
          const phonesToAdd = normPhone && !teacher.phones.includes(normPhone) ? [normPhone] : [];
          const emailsToAdd = normEmail && !teacher.emails.includes(normEmail) ? [normEmail] : [];
          const nameConflict = !!row.name && row.name.trim().toLowerCase() !== teacher.name.trim().toLowerCase();
          const schoolConflict = !!row.school && !!teacher.school &&
            row.school.trim().toLowerCase() !== teacher.school.trim().toLowerCase();
          const noChanges = !nameConflict && !schoolConflict && phonesToAdd.length === 0 && emailsToAdd.length === 0;

          matches.push({
            rowIndex: i, row,
            existingTeacher: { id: teacher.id, name: teacher.name, phones: teacher.phones, emails: teacher.emails, school: teacher.school ?? '', city: teacher.city ?? '' },
            confidence, matchReasons,
            diff: { nameConflict, phonesToAdd, emailsToAdd, schoolConflict, noChanges },
          });
        }
      } else if (row.name) {
        unmatchedIdxs.push(i);
      }
    }

    // ---- 3. Fuzzy name + school for rows with no phone/email match ----
    if (unmatchedIdxs.length > 0) {
      const nameTokens = [...new Set(
        unmatchedIdxs.map(i => (rows[i]?.name ?? '').trim().split(/\s+/)[0]?.toLowerCase() ?? '').filter(t => t.length > 2)
      )];

      if (nameTokens.length > 0) {
        const candidates = await db.query.teachers.findMany({
          where: or(...nameTokens.map(token => ilike(teachers.name, `%${token}%`))),
          limit: 500,
        });

        for (const idx of unmatchedIdxs) {
          const row = rows[idx]!;
          let bestTeacher: typeof candidates[number] | undefined;
          let bestScore = 0;
          const bestReasons: string[] = [];

          for (const candidate of candidates) {
            let score = 0;
            const reasons: string[] = [];
            const uploadTokens = row.name.toLowerCase().split(/\s+/).filter(t => t.length > 1);
            const dbTokens = candidate.name.toLowerCase().split(/\s+/).filter(t => t.length > 1);
            const overlap = uploadTokens.filter(t => dbTokens.includes(t)).length;
            const nameScore = overlap / Math.max(uploadTokens.length, dbTokens.length, 1);
            if (nameScore >= 0.5) { score += Math.round(nameScore * 50); reasons.push('Name similarity'); }
            if (row.school && candidate.school) {
              const sA = row.school.toLowerCase().replace(/\s+/g, ' ');
              const sB = candidate.school.toLowerCase().replace(/\s+/g, ' ');
              if (sA === sB) { score += 30; reasons.push('School match'); }
              else if (sA.includes(sB.substring(0, 5)) || sB.includes(sA.substring(0, 5))) { score += 15; reasons.push('School partial match'); }
            }
            if (score > bestScore && score >= 55) { bestScore = score; bestTeacher = candidate; bestReasons.length = 0; bestReasons.push(...reasons); }
          }

          if (bestTeacher && bestScore >= 55) {
            const confidence = Math.min(75, 60 + Math.round((bestScore - 55) / 45 * 15));
            const normPhone = normalizePhone(row.phone);
            const normEmail = normalizeEmail(row.email);
            const phonesToAdd = normPhone && !bestTeacher.phones.includes(normPhone) ? [normPhone] : [];
            const emailsToAdd = normEmail && !bestTeacher.emails.includes(normEmail) ? [normEmail] : [];
            const nameConflict = row.name.trim().toLowerCase() !== bestTeacher.name.trim().toLowerCase();
            const schoolConflict = !!row.school && !!bestTeacher.school &&
              row.school.trim().toLowerCase() !== bestTeacher.school.trim().toLowerCase();
            matches.push({
              rowIndex: idx, row,
              existingTeacher: { id: bestTeacher.id, name: bestTeacher.name, phones: bestTeacher.phones, emails: bestTeacher.emails, school: bestTeacher.school ?? '', city: bestTeacher.city ?? '' },
              confidence, matchReasons: bestReasons,
              diff: { nameConflict, phonesToAdd, emailsToAdd, schoolConflict, noChanges: !nameConflict && !schoolConflict && phonesToAdd.length === 0 && emailsToAdd.length === 0 },
            });
          }
        }
      }
    }

    matches.sort((a, b) => a.rowIndex - b.rowIndex);
    return { matches, total: matches.length };
  }

  private static async syncLookups(teacherId: string, phones: string[], emails: string[]) {
    for (const phone of phones) {
      await db.insert(phoneLookup).values({ phone, teacherId }).onConflictDoNothing();
    }
    for (const email of emails) {
      await db.insert(emailLookup).values({ email, teacherId }).onConflictDoNothing();
    }
  }
}
