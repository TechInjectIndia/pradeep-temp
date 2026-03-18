/**
 * Payload: teacherId-wise productIds with quantity.
 * teacherProducts[teacherRecordId][productId] = quantity
 */
export interface GenerateLinksRequest {
  batchId: string;
  /** teacherRecordId -> { productId -> quantity } */
  teacherProducts: Record<string, Record<string, number>>;
}

/**
 * Response: teacherId-wise productId-wise links (array length = quantity).
 * links[teacherRecordId][productId] = [url1, url2, ...]
 */
export interface GenerateLinksResponse {
  batchId: string;
  /** teacherRecordId -> { productId -> [url, url, ...] } */
  links: Record<string, Record<string, string[]>>;
  expiresAt: string;
  /** Collection where response was saved (batch_links) */
  savedTo: string;
  /** Document ID in batch_links for this batch */
  savedDocId: string;
}
