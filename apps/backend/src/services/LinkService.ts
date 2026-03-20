/**
 * LinkService — generates specimen links for a batch via the LMS API.
 *
 * Flow:
 *  1. Load all orders for the batch (needs teacherRecordId)
 *  2. Load matching teachersRaw to get book codes (books / booksAssigned)
 *  3. Bulk-lookup book_mappings to resolve codes → productIds
 *  4. POST to LMS API: { batchId, teachers: { teacherRecordId: [productId] } }
 *  5. Parse response and store BookLink[] on each order
 *  6. Persist full link map in batchLinks table
 */
import { db } from '@/db';
import { orders, teachersRaw, bookMappings, batchLinks } from '@/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { config } from '@/config';
import { nanoid } from 'nanoid';
import type { BookLink } from '@/db/schema';

type LmsResponse = {
  batchId: string;
  teachers: Record<string, Record<string, string>>; // teacherRecordId → productId → url
};

export class LinkService {
  /**
   * Generate specimen links for every order in a batch.
   * Returns the number of teachers for whom links were generated.
   */
  static async generateForBatch(batchId: string): Promise<{ teacherCount: number; linkCount: number }> {
    // 1. Load all orders in the batch
    const batchOrders = await db.query.orders.findMany({
      where: eq(orders.batchId, batchId),
    });

    if (batchOrders.length === 0) {
      return { teacherCount: 0, linkCount: 0 };
    }

    // 2. Load corresponding teachersRaw rows to get book codes
    const recordIds = batchOrders.map((o) => o.teacherRecordId);
    const rawRows = await db.query.teachersRaw.findMany({
      where: inArray(teachersRaw.id, recordIds),
    });
    const rawByRecordId = new Map(rawRows.map((r) => [r.id, r]));

    // 3. Collect all unique book codes across the batch
    const allCodes = new Set<string>();
    for (const raw of rawRows) {
      const bookStr = raw.books ?? raw.booksAssigned ?? '';
      for (const code of bookStr.split(',')) {
        const c = code.trim();
        if (c) allCodes.add(c);
      }
    }

    if (allCodes.size === 0) {
      return { teacherCount: batchOrders.length, linkCount: 0 };
    }

    // 4. Bulk-lookup book_mappings for all codes
    const mappingRows = await db.query.bookMappings.findMany({
      where: inArray(bookMappings.bookCode, [...allCodes]),
    });
    // code → productId[] (one code can map to multiple products)
    const codeToProducts = new Map<string, string[]>();
    for (const m of mappingRows) {
      const existing = codeToProducts.get(m.bookCode) ?? [];
      existing.push(m.productId);
      codeToProducts.set(m.bookCode, existing);
    }
    // productId → title (for building BookLink after API response)
    const productIdToTitle = new Map(
      mappingRows.map((m) => [m.productId, m.productTitle])
    );

    // 5. Build the LMS API payload
    // teachers: { teacherRecordId: [productId, ...] }
    const teachersPayload: Record<string, string[]> = {};
    for (const order of batchOrders) {
      const raw = rawByRecordId.get(order.teacherRecordId);
      const bookStr = raw?.books ?? raw?.booksAssigned ?? '';
      const productIds = bookStr
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean)
        .flatMap((c) => codeToProducts.get(c) ?? []);

      if (productIds.length > 0) {
        teachersPayload[order.teacherRecordId] = productIds;
      }
    }

    if (Object.keys(teachersPayload).length === 0) {
      return { teacherCount: batchOrders.length, linkCount: 0 };
    }

    // 6. Call LMS API
    const { baseUrl, apiKey } = config.lms;
    const res = await fetch(`${baseUrl}/v1/teacher-batch-links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ batchId, teachers: teachersPayload }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`LMS API error ${res.status}: ${text}`);
    }

    const lmsData = (await res.json()) as LmsResponse;

    // 7. Build per-order BookLink[] and collect full link map
    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
    const fullLinkMap: Record<string, Record<string, string>> = {};
    let totalLinks = 0;

    const updatePromises: Promise<unknown>[] = [];

    for (const order of batchOrders) {
      const teacherLinks = lmsData.teachers[order.teacherRecordId];
      if (!teacherLinks) continue;

      const bookLinkEntries: BookLink[] = Object.entries(teacherLinks).map(
        ([productId, specimenUrl]) => ({
          productId,
          title: productIdToTitle.get(productId) ?? productId,
          specimenUrl,
          expiresAt: expiresAt.toISOString(),
        })
      );

      updatePromises.push(
        db
          .update(orders)
          .set({
            books: bookLinkEntries,
            totalBooks: bookLinkEntries.length,
            expiresAt,
            status: 'links_generated',
            updatedAt: new Date(),
          })
          .where(eq(orders.id, order.id))
      );

      fullLinkMap[order.teacherRecordId] = teacherLinks;
      totalLinks += bookLinkEntries.length;
    }

    // Run all order updates in parallel
    await Promise.all(updatePromises);

    // 8. Persist full link map in batchLinks (upsert via batchId unique)
    await db
      .insert(batchLinks)
      .values({
        id: nanoid(),
        batchId,
        links: fullLinkMap,
        expiresAt,
      })
      .onConflictDoUpdate({
        target: batchLinks.batchId,
        set: {
          links: fullLinkMap,
          expiresAt,
          updatedAt: new Date(),
        },
      });

    return { teacherCount: Object.keys(fullLinkMap).length, linkCount: totalLinks };
  }

  /** Retrieve stored links for a batch */
  static async getForBatch(batchId: string) {
    return db.query.batchLinks.findFirst({
      where: eq(batchLinks.batchId, batchId),
    });
  }
}
