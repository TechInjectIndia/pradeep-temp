/**
 * Message hash generation for idempotency checks.
 * Uses SHA-256 to produce a deterministic hash from message parameters.
 */

import * as crypto from 'crypto';

/**
 * Generate a SHA-256 hash for a message, based on the teacher phone,
 * batch ID, and sorted product IDs. Used to prevent duplicate message sends.
 *
 * @param teacherPhone - Normalized phone number of the teacher
 * @param batchId      - Unique identifier for the batch
 * @param productIds   - List of product IDs included in the message
 * @returns Hex-encoded SHA-256 hash string
 */
export function generateMessageHash(
  teacherPhone: string,
  batchId: string,
  productIds: string[],
): string {
  const sortedProducts = [...productIds].sort();
  const payload = `${sortedProducts.join(',')}|${teacherPhone}|${batchId}`;

  return crypto.createHash('sha256').update(payload, 'utf8').digest('hex');
}
