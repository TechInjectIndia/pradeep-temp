import * as DuplicateRepository from '../repositories/DuplicateRepository';
import * as TeacherService from './TeacherService';

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Flag a possible duplicate between a raw teacher record and an existing
 * teacher_master candidate.
 */
export async function flagDuplicate(
  rawTeacherId: string,
  candidateTeacherId: string,
  batchId: string,
  score: number,
  reasons: string[],
): Promise<void> {
  await DuplicateRepository.create({
    rawTeacherId,
    candidateTeacherId,
    batchId,
    score,
    reasons,
    resolution: 'pending',
  });
}

/**
 * Resolve a flagged duplicate.
 *
 * Actions:
 *   - 'merge': merge the incoming teacher data into the candidate via TeacherService
 *   - 'keep_separate': mark as resolved with no merge
 */
export async function resolveDuplicate(
  duplicateId: string,
  action: 'merge' | 'keep_separate',
  reviewedBy: string,
): Promise<void> {
  const duplicate = await DuplicateRepository.getById(duplicateId);
  if (!duplicate) {
    throw new Error(`Duplicate record ${duplicateId} not found`);
  }

  const dup = duplicate as any;

  if (dup.resolution !== 'PENDING') {
    throw new Error(
      `Duplicate ${duplicateId} has already been resolved (resolution: ${dup.resolution})`,
    );
  }

  if (action === 'merge') {
    const incoming = dup.incomingRecord || {};
    await TeacherService.mergeTeacher(dup.candidateTeacherId, {
      name: incoming.name || '',
      phone: incoming.phone || '',
      email: incoming.email || '',
      school: incoming.school || '',
      city: incoming.city || '',
    });
  }

  await DuplicateRepository.update(duplicateId, {
    resolution: action === 'merge' ? 'MERGED' : 'KEPT_SEPARATE',
    reviewedBy,
    resolvedAt: new Date().toISOString(),
  });
}

/**
 * List flagged duplicates with optional filters and page-based pagination.
 * Maps raw Firestore documents to the shape expected by the frontend UI.
 */
export async function listDuplicates(
  filters?: { batchId?: string; resolution?: string },
  limit?: number,
  offset?: number,
) {
  const raw = await DuplicateRepository.list(filters, limit, undefined, offset);
  return raw.map((doc: any) => ({
    id: doc.id,
    batchId: doc.batchId || '',
    incomingRecord: doc.incomingRecord || {
      name: '',
      phone: '',
      email: '',
      school: '',
      city: '',
    },
    existingRecord: doc.existingRecord || {
      name: '',
      phone: '',
      email: '',
      school: '',
      city: '',
    },
    confidenceScore: typeof doc.confidenceScore === 'number' ? doc.confidenceScore : (doc.score || 0) / 100,
    matchReasons: doc.matchReasons || doc.reasons || [],
    resolution: doc.resolution || 'PENDING',
    createdAt: doc.createdAt || '',
  }));
}
