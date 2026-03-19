import * as TeacherRawRepository from '../repositories/TeacherRawRepository';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchLinksRepository from '../repositories/BatchLinksRepository';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import { config } from '../config';
import type { GenerateLinksRequest, GenerateLinksResponse } from '../types/specimen';

const BASE_URL = config.app.specimenBaseUrl || 'https://specimens.example.com';

/**
 * Generate specimen links for teachers × products × quantity.
 * Validates teachers belong to batch, then generates URLs and saves to batch_links.
 */
export async function generateLinks(
  payload: GenerateLinksRequest,
): Promise<GenerateLinksResponse> {
  const { batchId, teacherProducts } = payload;

  const batch = await BatchRepository.getById(batchId);
  if (!batch) throw new Error(`Batch ${batchId} not found`);

  const rawTeachers = await TeacherRawRepository.getByBatchId(batchId);
  const teacherIds = new Set(rawTeachers.map((t: any) => t.id));

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + config.app.linkExpiryDays);
  const expiresAt = expiryDate.toISOString();

  const links: Record<string, Record<string, string[]>> = {};

  for (const [teacherRecordId, products] of Object.entries(teacherProducts)) {
    if (!teacherIds.has(teacherRecordId)) {
      console.warn(`Teacher ${teacherRecordId} not found in batch ${batchId}, skipping`);
      continue;
    }

    links[teacherRecordId] = {};

    for (const [productId, qty] of Object.entries(products)) {
      const qtyNum = Math.max(0, Math.floor(Number(qty) || 0));
      const urls: string[] = [];
      for (let i = 0; i < qtyNum; i++) {
        urls.push(`${BASE_URL.replace(/\/$/, '')}/view/${batchId}/${teacherRecordId}/${productId}${qtyNum > 1 ? `?q=${i + 1}` : ''}`);
      }
      if (urls.length > 0) {
        links[teacherRecordId][productId] = urls;
      }
    }
  }

  const response: Omit<GenerateLinksResponse, 'savedTo' | 'savedDocId'> = {
    batchId,
    links,
    expiresAt,
  };

  const savedDocId = await BatchLinksRepository.save(batchId, response);

  await BatchLogRepository.append(batchId, {
    step: 'ordering_order_created',
    message: 'Links generated',
    detail: `Generated links for ${Object.keys(links).length} teachers, saved to batch_links`,
    metadata: { savedDocId, teacherCount: Object.keys(links).length },
  }).catch((e) => console.error('BatchLog append failed:', e));

  return {
    ...response,
    savedTo: 'batch_links',
    savedDocId,
  };
}
