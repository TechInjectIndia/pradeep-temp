/**
 * TemplateEngine — resolves WATI template parameters from order/teacher context.
 *
 * Available data paths:
 *   teacher.name | teacher.phone | teacher.email | teacher.school | teacher.city
 *   books.{N}.title | books.{N}.specimenUrl | books.{N}.productId | books.{N}.author  (N = 0–11)
 *   batch.id
 */
import type { WatiTemplateParam } from '@/db/schema';

export type TemplateContext = {
  teacherName: string;
  teacherPhone?: string | null;
  teacherEmail?: string | null;
  school?: string | null;
  city?: string | null;
  batchId: string;
  books: Array<{
    title: string;
    specimenUrl: string;
    productId: string;
    author?: string | null;
  }>;
};

/** Resolve a single dot-notation path against the context. */
function resolvePath(path: string, ctx: TemplateContext): string {
  const parts = path.split('.');

  if (parts[0] === 'teacher') {
    const field = parts[1];
    if (field === 'name') return ctx.teacherName ?? '';
    if (field === 'phone') return ctx.teacherPhone ?? '';
    if (field === 'email') return ctx.teacherEmail ?? '';
    if (field === 'school') return ctx.school ?? '';
    if (field === 'city') return ctx.city ?? '';
  }

  if (parts[0] === 'batch') {
    if (parts[1] === 'id') return ctx.batchId ?? '';
  }

  if (parts[0] === 'books') {
    const idx = parseInt(parts[1] ?? '', 10);
    if (!isNaN(idx) && idx >= 0 && idx < ctx.books.length) {
      const book = ctx.books[idx]!;
      const field = parts[2];
      if (field === 'title') return book.title ?? '';
      if (field === 'specimenUrl') return book.specimenUrl ?? '';
      if (field === 'productId') return book.productId ?? '';
      if (field === 'author') return book.author ?? '';
    }
    return '';
  }

  return '';
}

/**
 * Build the WATI API `parameters` array from a template's param definitions
 * and a resolved context.
 */
export function resolveParams(
  params: WatiTemplateParam[],
  ctx: TemplateContext
): Array<{ name: string; value: string }> {
  return params.map(({ paramName, dataPath, fallback }) => ({
    name: paramName,
    value: resolvePath(dataPath, ctx) || fallback || '',
  }));
}

/**
 * Extract all {{variableName}} tokens from a WATI template body text.
 * Returns them in order of appearance, deduplicated.
 */
export function parseTemplateVariables(body: string): string[] {
  const matches = body.match(/\{\{([^}]+)\}\}/g) ?? [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const m of matches) {
    const name = m.slice(2, -2).trim();
    if (!seen.has(name)) {
      seen.add(name);
      result.push(name);
    }
  }
  return result;
}
