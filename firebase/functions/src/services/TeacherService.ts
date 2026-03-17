import * as TeacherRepository from '../repositories/TeacherRepository';
import * as PhoneLookupRepository from '../repositories/PhoneLookupRepository';
import * as EmailLookupRepository from '../repositories/EmailLookupRepository';
import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as DuplicateRepository from '../repositories/DuplicateRepository';
import * as AlgoliaAdapter from '../infrastructure/algolia/AlgoliaAdapter';

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

/**
 * Normalise a phone number to E.164 format.
 * Strips non-digit characters and prepends +91 for 10-digit Indian numbers.
 */
function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  if (digits.length > 10 && !digits.startsWith('+')) {
    return `+${digits}`;
  }
  return phone.startsWith('+') ? phone : `+${digits}`;
}

/**
 * Normalise an email address to lowercase and trim whitespace.
 */
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Compute a simple bigram-based similarity score between two strings (0-1).
 */
function stringSimilarity(a: string, b: string): number {
  const aNorm = a.toLowerCase().trim();
  const bNorm = b.toLowerCase().trim();
  if (aNorm === bNorm) return 1;
  if (aNorm.length < 2 || bNorm.length < 2) return 0;

  const bigramsA = new Set<string>();
  for (let i = 0; i < aNorm.length - 1; i++) {
    bigramsA.add(aNorm.substring(i, i + 2));
  }

  const bigramsB = new Set<string>();
  for (let i = 0; i < bNorm.length - 1; i++) {
    bigramsB.add(bNorm.substring(i, i + 2));
  }

  let intersection = 0;
  for (const bg of bigramsB) {
    if (bigramsA.has(bg)) intersection++;
  }

  return (2 * intersection) / (bigramsA.size + bigramsB.size);
}

/**
 * Score a candidate teacher against the incoming raw data.
 *
 * Weights:
 *   name similarity:    0-40
 *   school exact match: 30
 *   school similar:     0-20
 *   city match:         10
 */
function scoreCandidate(
  candidate: { name: string; school: string; city: string },
  incoming: RawTeacherInput,
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Name similarity (0-40)
  const nameSim = stringSimilarity(candidate.name, incoming.name);
  const nameScore = Math.round(nameSim * 40);
  score += nameScore;
  if (nameScore > 0) reasons.push(`name_similarity:${nameScore}`);

  // School scoring
  const candidateSchool = candidate.school?.toLowerCase().trim() ?? '';
  const incomingSchool = incoming.school?.toLowerCase().trim() ?? '';
  if (candidateSchool && incomingSchool) {
    if (candidateSchool === incomingSchool) {
      score += 30;
      reasons.push('school_exact:30');
    } else {
      const schoolSim = stringSimilarity(candidate.school, incoming.school);
      const schoolScore = Math.round(schoolSim * 20);
      score += schoolScore;
      if (schoolScore > 0) reasons.push(`school_similar:${schoolScore}`);
    }
  }

  // City match (10)
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

/**
 * Resolve an incoming raw teacher to an existing or new teacher_master record.
 *
 * Resolution steps:
 *   1. Phone lookup  (confidence 100 on match)
 *   2. Email lookup  (confidence 95 on match)
 *   3. Fuzzy search via Algolia + scoring
 *      - > 90: auto-merge existing
 *      - 70-90: flag as possible duplicate, create new
 *      - < 70: create new
 */
export async function resolveTeacher(
  rawTeacher: RawTeacherInput,
): Promise<ResolveResult> {
  // Step 1 — phone lookup
  if (rawTeacher.phone) {
    const normalizedPhone = normalizePhone(rawTeacher.phone);
    const existingTeacherId = await PhoneLookupRepository.lookup(normalizedPhone);
    if (existingTeacherId) {
      // Auto-merge any new data into the existing teacher
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
      const candidates = await AlgoliaAdapter.searchTeachers(searchQuery);

      let bestScore = 0;
      let bestCandidate: AlgoliaAdapter.TeacherSearchResult | null = null;
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
        // Auto-merge
        await mergeTeacher(bestCandidate.objectID, rawTeacher);
        return {
          teacherId: bestCandidate.objectID,
          isNew: false,
          confidence: bestScore,
        };
      }

      if (bestCandidate && bestScore >= 70 && bestScore <= 90) {
        // Create new teacher but flag as possible duplicate (non-blocking)
        const teacherId = await createNewTeacher(rawTeacher);
        DuplicateRepository.create({
          rawTeacherId: teacherId,
          candidateTeacherId: bestCandidate.objectID,
          score: bestScore,
          reasons: bestReasons,
          resolution: 'pending',
        }).catch((err: unknown) => {
          console.error('Failed to flag duplicate', err);
        });
        return { teacherId, isNew: true, confidence: bestScore };
      }
    } catch (err) {
      console.error('Algolia search failed, falling through to create', err);
    }
  }

  // Step 4 — no match; create new
  const teacherId = await createNewTeacher(rawTeacher);
  return { teacherId, isNew: true, confidence: 0 };
}

/**
 * Create a brand-new teacher_master record along with lookup entries and Algolia index.
 */
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

  const teacherId = teacher.id;

  // Lookup entries are created inside TeacherRepository.create already,
  // but we still need to index in Algolia.
  try {
    await AlgoliaAdapter.indexTeacher({
      objectID: teacherId,
      name: data.name,
      school: data.school,
      city: data.city,
      phoneticNameKey: data.name.toLowerCase().replace(/\s+/g, ''),
    });
  } catch (err) {
    console.error('Failed to index teacher in Algolia', err);
  }

  return teacherId;
}

/**
 * Merge incoming data into an existing teacher_master record.
 * Adds any new phone / email and updates Algolia.
 */
export async function mergeTeacher(
  existingId: string,
  incomingData: RawTeacherInput,
): Promise<void> {
  const existing = await TeacherRepository.getById(existingId);
  if (!existing) {
    throw new Error(`Teacher ${existingId} not found for merge`);
  }

  // Add new phone if not already present
  if (incomingData.phone) {
    const normalizedPhone = normalizePhone(incomingData.phone);
    const existingPhones: string[] = (existing as any).phones || [];
    if (!existingPhones.includes(normalizedPhone)) {
      await TeacherRepository.addPhone(existingId, normalizedPhone);
    }
  }

  // Add new email if not already present
  if (incomingData.email) {
    const normalizedEmail = normalizeEmail(incomingData.email);
    const existingEmails: string[] = (existing as any).emails || [];
    if (!existingEmails.includes(normalizedEmail)) {
      await TeacherRepository.addEmail(existingId, normalizedEmail);
    }
  }

  // Update school/city if provided and different
  const updates: Record<string, unknown> = {};
  if (incomingData.school && incomingData.school !== (existing as any).school) {
    updates.school = incomingData.school;
  }
  if (incomingData.city && incomingData.city !== (existing as any).city) {
    updates.city = incomingData.city;
  }
  if (Object.keys(updates).length > 0) {
    await TeacherRepository.update(existingId, updates);
  }

  // Re-index in Algolia
  try {
    await AlgoliaAdapter.indexTeacher({
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
 * Updates each teachers_raw record with the resolution result.
 */
export async function resolveTeachersForBatch(batchId: string): Promise<void> {
  const pendingRawTeachers = await TeacherRawRepository.getPendingByBatchId(batchId);

  for (const rawRecord of pendingRawTeachers) {
    try {
      const result = await resolveTeacher({
        name: (rawRecord as any).name,
        phone: (rawRecord as any).phone,
        email: (rawRecord as any).email,
        school: (rawRecord as any).school,
        city: (rawRecord as any).city,
      });

      await TeacherRawRepository.update(rawRecord.id, {
        resolutionStatus: 'resolved',
        teacherMasterId: result.teacherId,
        isNewTeacher: result.isNew,
        resolutionConfidence: result.confidence,
      });
    } catch (err) {
      console.error(`Failed to resolve raw teacher ${rawRecord.id}`, err);
      await TeacherRawRepository.update(rawRecord.id, {
        resolutionStatus: 'error',
        resolutionError: err instanceof Error ? err.message : String(err),
      });
    }
  }
}
