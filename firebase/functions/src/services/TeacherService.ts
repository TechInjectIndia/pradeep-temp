import * as TeacherRepository from '../repositories/TeacherRepository';
import * as PhoneLookupRepository from '../repositories/PhoneLookupRepository';
import * as EmailLookupRepository from '../repositories/EmailLookupRepository';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as DuplicateRepository from '../repositories/DuplicateRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';
import { TeacherSearchResult } from '../ports';

interface TeacherSnapshot {
  name: string;
  phone: string;
  email: string;
  school: string;
  city: string;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface RawTeacherInput {
  name: string;
  phone: string;
  email: string;
  school: string;
  city: string;
}

interface ResolveResult {
  teacherId: string;
  isNew: boolean;
  confidence: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return `+${digits}`;
  if (digits.length > 10 && !digits.startsWith('+')) return `+${digits}`;
  return phone.startsWith('+') ? phone : `+${digits}`;
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

function stringSimilarity(a: string, b: string): number {
  const aNorm = a.toLowerCase().trim();
  const bNorm = b.toLowerCase().trim();
  if (aNorm === bNorm) return 1;
  if (aNorm.length < 2 || bNorm.length < 2) return 0;

  const bigramsA = new Set<string>();
  for (let i = 0; i < aNorm.length - 1; i++) bigramsA.add(aNorm.substring(i, i + 2));

  const bigramsB = new Set<string>();
  for (let i = 0; i < bNorm.length - 1; i++) bigramsB.add(bNorm.substring(i, i + 2));

  let intersection = 0;
  for (const bg of bigramsB) {
    if (bigramsA.has(bg)) intersection++;
  }

  return (2 * intersection) / (bigramsA.size + bigramsB.size);
}

// Max raw score: name(40) + school_exact(30) + city(10) = 80
const MAX_RAW_SCORE = 80;

/** True when row and existing teacher have same name, email, and phone (normalized) */
function isExactMatch(
  row: { name: string; phone: string; email: string },
  existing: { name: string; phones: string[]; emails: string[] },
): boolean {
  const rowName = row.name?.toLowerCase().trim() || '';
  const existingName = (existing.name || '').toLowerCase().trim();
  if (rowName !== existingName) return false;

  const rowPhone = normalizePhone(row.phone);
  const existingPhones = (existing.phones || []).map((p) => normalizePhone(p));
  if (rowPhone && !existingPhones.includes(rowPhone)) return false;

  const rowEmail = normalizeEmail(row.email);
  const existingEmails = (existing.emails || []).map((e) => normalizeEmail(e));
  if (rowEmail && !existingEmails.includes(rowEmail)) return false;

  return true;
}

function scoreCandidate(
  candidate: { name: string; school: string; city: string },
  incoming: RawTeacherInput,
): { score: number; reasons: string[] } {
  let raw = 0;
  const reasons: string[] = [];

  const nameSim = stringSimilarity(candidate.name, incoming.name);
  const nameRaw = Math.round(nameSim * 40);
  raw += nameRaw;
  if (nameRaw > 0) reasons.push(`name:${Math.round(nameSim * 100)}%`);

  const candidateSchool = candidate.school?.toLowerCase().trim() ?? '';
  const incomingSchool = incoming.school?.toLowerCase().trim() ?? '';
  if (candidateSchool && incomingSchool) {
    if (candidateSchool === incomingSchool) {
      raw += 30;
      reasons.push('school:exact');
    } else {
      const schoolSim = stringSimilarity(candidate.school, incoming.school);
      const schoolRaw = Math.round(schoolSim * 20);
      raw += schoolRaw;
      if (schoolRaw > 0) reasons.push(`school:${Math.round(schoolSim * 100)}%`);
    }
  }

  const candidateCity = candidate.city?.toLowerCase().trim() ?? '';
  const incomingCity = incoming.city?.toLowerCase().trim() ?? '';
  if (candidateCity && incomingCity && candidateCity === incomingCity) {
    raw += 10;
    reasons.push('city:match');
  }

  // Normalize to 0–100 so thresholds (>90 auto-merge, 70–90 flag) match the spec
  const score = Math.min(100, Math.round((raw / MAX_RAW_SCORE) * 100));
  return { score, reasons };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function resolveTeacher(rawTeacher: RawTeacherInput, batchId?: string): Promise<ResolveResult> {
  // Step 1 — phone lookup
  if (rawTeacher.phone) {
    const normalizedPhone = normalizePhone(rawTeacher.phone);
    const existingTeacherId = await PhoneLookupRepository.lookup(normalizedPhone);
    if (existingTeacherId) {
      await mergeTeacher(existingTeacherId, rawTeacher);
      return { teacherId: existingTeacherId, isNew: false, confidence: 100 };
    }
  }

  // Step 2 — email lookup
  if (rawTeacher.email) {
    const normalizedEmail = normalizeEmail(rawTeacher.email);
    const existingTeacherId = await EmailLookupRepository.lookup(normalizedEmail);
    if (existingTeacherId) {
      await mergeTeacher(existingTeacherId, rawTeacher);
      return { teacherId: existingTeacherId, isNew: false, confidence: 95 };
    }
  }

  // Step 3 — fuzzy search via Algolia
  const searchQuery = [rawTeacher.name, rawTeacher.school, rawTeacher.city]
    .filter(Boolean)
    .join(' ');

  if (searchQuery) {
    try {
      const candidates = await AdapterRegistry.getInstance().search.searchTeachers(searchQuery);

      let bestScore = 0;
      let bestCandidate: TeacherSearchResult | null = null;
      let bestReasons: string[] = [];

      for (const candidate of candidates) {
        const { score, reasons } = scoreCandidate(candidate, rawTeacher);
        if (score > bestScore) {
          bestScore = score;
          bestCandidate = candidate;
          bestReasons = reasons;
        }
      }

      if (bestCandidate && bestScore > 90) {
        await mergeTeacher(bestCandidate.objectID, rawTeacher);
        return { teacherId: bestCandidate.objectID, isNew: false, confidence: bestScore };
      }

      if (bestCandidate && bestScore >= 70) {
        const teacherId = await createNewTeacher(rawTeacher);

        // Fetch existing teacher from Firestore for full display data
        const existingTeacher = await TeacherRepository.getById(bestCandidate.objectID).catch(() => null);
        const existingSnap: TeacherSnapshot = {
          name: (existingTeacher as any)?.name || bestCandidate.name || '',
          phone: ((existingTeacher as any)?.phones?.[0] || ''),
          email: ((existingTeacher as any)?.emails?.[0] || ''),
          school: (existingTeacher as any)?.school || bestCandidate.school || '',
          city: (existingTeacher as any)?.city || bestCandidate.city || '',
        };
        const incomingSnap: TeacherSnapshot = {
          name: rawTeacher.name,
          phone: rawTeacher.phone,
          email: rawTeacher.email,
          school: rawTeacher.school,
          city: rawTeacher.city,
        };

        DuplicateRepository.create({
          batchId: batchId || '',
          rawTeacherId: teacherId,
          candidateTeacherId: bestCandidate.objectID,
          confidenceScore: bestScore / 100,
          matchReasons: bestReasons,
          resolution: 'PENDING',
          incomingRecord: incomingSnap,
          existingRecord: existingSnap,
        }).catch((err: unknown) => console.error('Failed to flag duplicate', err));
        return { teacherId, isNew: true, confidence: bestScore };
      }
    } catch (err) {
      console.error('Algolia search failed, falling through to create', err);
    }
  }

  const teacherId = await createNewTeacher(rawTeacher);
  return { teacherId, isNew: true, confidence: 0 };
}

export async function createNewTeacher(data: RawTeacherInput): Promise<string> {
  const phones: string[] = [];
  const emails: string[] = [];

  if (data.phone) phones.push(normalizePhone(data.phone));
  if (data.email) emails.push(normalizeEmail(data.email));

  const teacher = await TeacherRepository.create({
    name: data.name,
    phones,
    emails,
    school: data.school,
    city: data.city,
  });

  try {
    await AdapterRegistry.getInstance().search.indexTeacher({
      objectID: teacher.id,
      name: data.name,
      school: data.school,
      city: data.city,
      phoneticNameKey: data.name.toLowerCase().replace(/\s+/g, ''),
    });
  } catch (err) {
    console.error('Failed to index teacher in Algolia', err);
  }

  return teacher.id;
}

export async function mergeTeacher(
  existingId: string,
  incomingData: RawTeacherInput,
): Promise<void> {
  const existing = await TeacherRepository.getById(existingId);
  if (!existing) throw new Error(`Teacher ${existingId} not found for merge`);

  const ops: Promise<void>[] = [];

  if (incomingData.phone) {
    const normalizedPhone = normalizePhone(incomingData.phone);
    const existingPhones: string[] = (existing as any).phones || [];
    if (!existingPhones.includes(normalizedPhone)) {
      ops.push(TeacherRepository.addPhone(existingId, normalizedPhone));
    }
  }

  if (incomingData.email) {
    const normalizedEmail = normalizeEmail(incomingData.email);
    const existingEmails: string[] = (existing as any).emails || [];
    if (!existingEmails.includes(normalizedEmail)) {
      ops.push(TeacherRepository.addEmail(existingId, normalizedEmail));
    }
  }

  const updates: Record<string, unknown> = {};
  if (incomingData.school && incomingData.school !== (existing as any).school) {
    updates.school = incomingData.school;
  }
  if (incomingData.city && incomingData.city !== (existing as any).city) {
    updates.city = incomingData.city;
  }
  if (Object.keys(updates).length > 0) {
    ops.push(TeacherRepository.update(existingId, updates));
  }

  await Promise.all(ops);

  try {
    await AdapterRegistry.getInstance().search.indexTeacher({
      objectID: existingId,
      name: incomingData.name || (existing as any).name,
      school: incomingData.school || (existing as any).school,
      city: incomingData.city || (existing as any).city,
      phoneticNameKey: ((incomingData.name || (existing as any).name) as string)
        .toLowerCase()
        .replace(/\s+/g, ''),
    });
  } catch (err) {
    console.error('Failed to re-index teacher in Algolia', err);
  }
}

/**
 * Resolve all pending raw teacher records for a batch.
 * Processes in parallel chunks of 20 to avoid sequential bottleneck and
 * Firestore/Algolia rate limits. Updates batch stats incrementally.
 * Calls checkAndAdvanceBatch when done so the batch auto-advances to ORDERING.
 */
export async function resolveTeachersForBatch(batchId: string): Promise<void> {
  const pendingRawTeachers = await TeacherRawRepository.getPendingByBatchId(batchId);

  // If no pending records, sync stats from raw records (handles trigger partial-run or stats drift)
  if (pendingRawTeachers.length === 0) {
    const allRaw = await TeacherRawRepository.getByBatchId(batchId);
    const resolvedCount = allRaw.filter((r: any) => r.resolutionStatus === 'resolved').length;
    const errorCount = allRaw.filter((r: any) => r.resolutionStatus === 'error').length;
    if (allRaw.length > 0) {
      await BatchRepository.update(batchId, {
        'stats.teachersResolved': resolvedCount,
        'stats.resolutionErrors': errorCount,
      });
      console.log(
        `resolveTeachersForBatch(${batchId}): 0 pending, synced stats from raw (resolved=${resolvedCount}, errors=${errorCount})`,
      );
    }
    return;
  }

  const CHUNK_SIZE = 20;
  let totalResolved = 0;
  let totalErrors = 0;

  for (let i = 0; i < pendingRawTeachers.length; i += CHUNK_SIZE) {
    const chunk = pendingRawTeachers.slice(i, i + CHUNK_SIZE);

    const results = await Promise.allSettled(
      chunk.map(async (rawRecord: any) => {
        const result = await resolveTeacher({
          name: rawRecord.name,
          phone: rawRecord.phone,
          email: rawRecord.email,
          school: rawRecord.school,
          city: rawRecord.city,
        }, batchId);

        await TeacherRawRepository.update(rawRecord.id, {
          resolutionStatus: 'resolved',
          teacherMasterId: result.teacherId,
          isNewTeacher: result.isNew,
          resolutionConfidence: result.confidence,
        });

        return result;
      }),
    );

    let chunkResolved = 0;
    let chunkErrors = 0;

    await Promise.allSettled(
      results.map(async (result, idx) => {
        if (result.status === 'fulfilled') {
          chunkResolved++;
        } else {
          chunkErrors++;
          const rawRecord = chunk[idx] as any;
          console.error(`Failed to resolve raw teacher ${rawRecord.id}:`, result.reason);
          await TeacherRawRepository.update(rawRecord.id, {
            resolutionStatus: 'error',
            resolutionError:
              result.reason instanceof Error ? result.reason.message : String(result.reason),
          });
        }
      }),
    );

    // Increment batch stats after each chunk
    const statOps: Promise<void>[] = [];
    if (chunkResolved > 0) {
      statOps.push(
        BatchRepository.incrementStat(batchId, 'stats.teachersResolved', chunkResolved),
      );
    }
    if (chunkErrors > 0) {
      statOps.push(
        BatchRepository.incrementStat(batchId, 'stats.resolutionErrors', chunkErrors),
      );
    }
    await Promise.all(statOps);

    totalResolved += chunkResolved;
    totalErrors += chunkErrors;
  }

  console.log(
    `resolveTeachersForBatch(${batchId}): resolved=${totalResolved}, errors=${totalErrors}`,
  );
}

// ---------------------------------------------------------------------------
// Pre-upload duplicate check — called from the review page before submission
// ---------------------------------------------------------------------------

export interface DBDuplicateMatch {
  /** Zero-based index of the uploaded row that matched */
  rowIndex: number;
  row: { name: string; phone: string; email: string; school: string };
  existingTeacher: {
    id: string;
    name: string;
    /** All phone numbers stored on the master record */
    phones: string[];
    /** All email addresses stored on the master record */
    emails: string[];
    school: string;
    city: string;
  };
  /** 0–100, same scale as server-side resolution */
  confidence: number;
  matchReasons: string[];
  /** True when name, email, and phone all match — no merge needed, use existing record */
  exactMatch?: boolean;
}

/**
 * Check a list of uploaded rows against existing teachers in the DB.
 *
 * For each row:
 *  1. Exact phone lookup (`phone_lookup` collection)
 *  2. Exact email lookup (`email_lookup` collection)
 *  3. Fuzzy name search via search adapter (Algolia / local)
 *
 * Returns only rows that have a match (confidence >= 65).
 * Does NOT create or modify any records.
 */
export async function checkDuplicatesForUpload(
  rows: { name: string; phone: string; email: string; school: string }[],
): Promise<DBDuplicateMatch[]> {
  const matches: DBDuplicateMatch[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let matchedTeacher: Record<string, any> | null = null;
    let confidence = 0;
    let reasons: string[] = [];

    // Step 1 — exact phone lookup
    if (row.phone) {
      const normalizedPhone = normalizePhone(row.phone);
      const teacherId = await PhoneLookupRepository.lookup(normalizedPhone);
      if (teacherId) {
        const teacher = await TeacherRepository.getById(teacherId) as Record<string, any> | null;
        if (teacher) {
          matchedTeacher = teacher;
          confidence = 100;
          reasons = ['phone: exact match'];
        }
      }
    }

    // Step 2 — exact email lookup
    if (!matchedTeacher && row.email) {
      const normalizedEmail = normalizeEmail(row.email);
      const teacherId = await EmailLookupRepository.lookup(normalizedEmail);
      if (teacherId) {
        const teacher = await TeacherRepository.getById(teacherId) as Record<string, any> | null;
        if (teacher) {
          matchedTeacher = teacher;
          confidence = 100;
          reasons = ['email: exact match'];
        }
      }
    }

    // Step 3 — fuzzy name search
    if (!matchedTeacher && row.name) {
      try {
        const searchQuery = [row.name, row.school].filter(Boolean).join(' ');
        const results = await AdapterRegistry.getInstance().search.searchTeachers(searchQuery);

        let bestScore = 0;
        let bestResult: TeacherSearchResult | null = null;
        let bestReasons: string[] = [];

        for (const result of results.slice(0, 5)) {
          const candidate = {
            name: result.name || '',
            school: result.school || '',
            city: result.city || '',
          };
          const { score, reasons: r } = scoreCandidate(candidate, {
            name: row.name,
            phone: row.phone,
            email: row.email,
            school: row.school,
            city: '',
          });
          if (score > bestScore) {
            bestScore = score;
            bestResult = result;
            bestReasons = r;
          }
        }

        if (bestScore >= 65 && bestResult) {
          const teacherId = (bestResult as any).teacherId || (bestResult as any).objectID || '';
          const teacher = teacherId
            ? await TeacherRepository.getById(teacherId) as Record<string, any> | null
            : null;
          if (teacher) {
            matchedTeacher = teacher;
            confidence = bestScore;
            reasons = bestReasons;
          }
        }
      } catch {
        // Search adapter unavailable (e.g. Algolia not configured) — skip fuzzy step
      }
    }

    if (matchedTeacher) {
      const phones: string[] = (matchedTeacher.phones as string[]) || [];
      const emails: string[] = (matchedTeacher.emails as string[]) || [];
      // Fall back to flat fields if arrays are empty (older records)
      if (phones.length === 0 && matchedTeacher.phone) phones.push(matchedTeacher.phone as string);
      if (emails.length === 0 && matchedTeacher.email) emails.push(matchedTeacher.email as string);
      const existingTeacher = {
        id: matchedTeacher.id as string || '',
        name: matchedTeacher.name as string || '',
        phones,
        emails,
        school: matchedTeacher.school as string || '',
        city: matchedTeacher.city as string || '',
      };
      const exactMatch = isExactMatch(row, existingTeacher);
      matches.push({
        rowIndex: i,
        row,
        existingTeacher,
        confidence,
        matchReasons: reasons,
        exactMatch,
      });
    }
  }

  return matches;
}

// ---------------------------------------------------------------------------
// Merge teacher profile (called when user confirms merge in review modal)
// ---------------------------------------------------------------------------

export interface MergeTeacherProfileInput {
  teacherId: string;
  name?: string;
  /** Full phones array — last index = primary */
  phones: string[];
  /** Full emails array — last index = primary */
  emails: string[];
}

/**
 * Persist merged teacher data when user confirms merge in the review modal.
 * Replaces phones and emails arrays, updates name if provided.
 * Normalizes phones and emails for consistent storage and lookup.
 */
export async function mergeTeacherProfile(input: MergeTeacherProfileInput): Promise<void> {
  const { teacherId, name, phones, emails } = input;

  const normalizedPhones = phones
    .map((p) => normalizePhone(p))
    .filter(Boolean);
  const normalizedEmails = emails
    .map((e) => normalizeEmail(e))
    .filter(Boolean);

  await TeacherRepository.replacePhonesAndEmails(teacherId, normalizedPhones, normalizedEmails);

  if (name) {
    await TeacherRepository.update(teacherId, { name });
  }

  try {
    const existing = await TeacherRepository.getById(teacherId) as Record<string, any> | null;
    if (existing) {
      await AdapterRegistry.getInstance().search.indexTeacher({
        objectID: teacherId,
        name: name || existing.name,
        school: existing.school || '',
        city: existing.city || '',
        phoneticNameKey: (name || existing.name || '').toLowerCase().replace(/\s+/g, ''),
      });
    }
  } catch (err) {
    console.error('Failed to re-index teacher after merge:', err);
  }
}
