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
 *   - 'merge': merge the raw teacher into the candidate via TeacherService
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

  if (dup.resolution !== 'pending') {
    throw new Error(
      `Duplicate ${duplicateId} has already been resolved (resolution: ${dup.resolution})`,
    );
  }

  if (action === 'merge') {
    // Perform the merge via TeacherService
    // We need the raw teacher data; the duplicate record stores the IDs
    await TeacherService.mergeTeacher(dup.candidateTeacherId, {
      name: dup.rawTeacherName || '',
      phone: dup.rawTeacherPhone || '',
      email: dup.rawTeacherEmail || '',
      school: dup.rawTeacherSchool || '',
      city: dup.rawTeacherCity || '',
    });
  }

  await DuplicateRepository.update(duplicateId, {
    resolution: action === 'merge' ? 'merged' : 'kept_separate',
    reviewedBy,
    resolvedAt: new Date().toISOString(),
  });
}

/**
 * List flagged duplicates with optional filters and pagination.
 */
export async function listDuplicates(
  filters?: { batchId?: string; resolution?: string },
  limit?: number,
  startAfter?: string,
) {
  return DuplicateRepository.list(filters, limit, startAfter);
}
