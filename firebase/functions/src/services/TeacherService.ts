import * as TeacherRepository from '../repositories/TeacherRepository';
import * as PhoneLookupRepository from '../repositories/PhoneLookupRepository';
import * as EmailLookupRepository from '../repositories/EmailLookupRepository';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as DuplicateRepository from '../repositories/DuplicateRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import { AdapterRegistry } from '../adapters/AdapterRegistry';
import { TeacherSearchResult } from '../ports';

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

function scoreCandidate(
  candidate: { name: string; school: string; city: string },
  incoming: RawTeacherInput,
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  const nameSim = stringSimilarity(candidate.name, incoming.name);
  const nameScore = Math.round(nameSim * 40);
  score += nameScore;
  if (nameScore > 0) reasons.push(`name_similarity:${nameScore}`);

  const candidateSchool = candidate.school?.toLowerCase().trim() ?? '';
  const incomingSchool = incoming.school?.toLowerCase().trim() ?? '';
  if (candidateSchool && incomingSchool) {
    if (candidateSchool === incomingSchool) {
      score += 30;
      reasons.push('school_exact:30');
    } else {
      const schoolScore = Math.round(stringSimilarity(candidate.school, incoming.school) * 20);
      score += schoolScore;
      if (schoolScore > 0) reasons.push(`school_similar:${schoolScore}`);
    }
  }

  const candidateCity = candidate.city?.toLowerCase().trim() ?? '';
  const incomingCity = incoming.city?.toLowerCase().trim() ?? '';
  if (candidateCity && incomingCity && candidateCity === incomingCity) {
    score += 10;
    reasons.push('city_match:10');
  }

  return { score, reasons };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function resolveTeacher(rawTeacher: RawTeacherInput): Promise<ResolveResult> {
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
        DuplicateRepository.create({
          rawTeacherId: teacherId,
          candidateTeacherId: bestCandidate.objectID,
          score: bestScore,
          reasons: bestReasons,
          resolution: 'pending',
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
        });

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
