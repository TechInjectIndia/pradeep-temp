import type { UploadRow } from "@/types";

export interface MergeGroup {
  indices: number[];
  reason: "email" | "phone" | "name_school";
  rows: UploadRow[];
  /** Confidence 0–100: email/phone = 100, name+school = 85 */
  confidence: number;
}

function normalize(s: string): string {
  return (s || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function normalizePhone(s: string): string {
  return (s || "").replace(/\D/g, "");
}

function normalizeEmail(s: string): string {
  return (s || "").toLowerCase().trim();
}

/**
 * Detect potential duplicate groups in parsed rows.
 * Matches: same email, same phone, or same name+school.
 */
export function detectMergeGroups(rows: UploadRow[]): MergeGroup[] {
  const groups: MergeGroup[] = [];
  const used = new Set<number>();

  // By email
  const byEmail = new Map<string, number[]>();
  rows.forEach((r, i) => {
    const e = normalizeEmail(r.email);
    if (e) {
      if (!byEmail.has(e)) byEmail.set(e, []);
      byEmail.get(e)!.push(i);
    }
  });
  for (const [, indices] of Array.from(byEmail.entries())) {
    if (indices.length > 1 && indices.some((i) => !used.has(i))) {
      const groupIndices = indices.filter((i) => !used.has(i));
      if (groupIndices.length > 1) {
        groups.push({
          indices: groupIndices,
          reason: "email",
          rows: groupIndices.map((i) => rows[i]),
          confidence: 100,
        });
        groupIndices.forEach((i) => used.add(i));
      }
    }
  }

  // By phone (only for indices not already in a group)
  const byPhone = new Map<string, number[]>();
  rows.forEach((r, i) => {
    if (used.has(i)) return;
    const p = normalizePhone(r.phone);
    if (p && p.length >= 5) {
      if (!byPhone.has(p)) byPhone.set(p, []);
      byPhone.get(p)!.push(i);
    }
  });
  for (const [, indices] of Array.from(byPhone.entries())) {
    if (indices.length > 1) {
      const groupIndices = indices.filter((i) => !used.has(i));
      if (groupIndices.length > 1) {
        groups.push({
          indices: groupIndices,
          reason: "phone",
          rows: groupIndices.map((i) => rows[i]),
          confidence: 100,
        });
        groupIndices.forEach((i) => used.add(i));
      }
    }
  }

  // By name+school
  const byNameSchool = new Map<string, number[]>();
  rows.forEach((r, i) => {
    if (used.has(i)) return;
    const key = `${normalize(r.name)}|${normalize(r.school)}`;
    if (key !== "|") {
      if (!byNameSchool.has(key)) byNameSchool.set(key, []);
      byNameSchool.get(key)!.push(i);
    }
  });
  for (const [, indices] of Array.from(byNameSchool.entries())) {
    if (indices.length > 1) {
      const groupIndices = indices.filter((i) => !used.has(i));
      if (groupIndices.length > 1) {
        groups.push({
          indices: groupIndices,
          reason: "name_school",
          rows: groupIndices.map((i) => rows[i]),
          confidence: 85,
        });
      }
    }
  }

  return groups;
}

/**
 * Merge rows into one: combine books, collect all phones and emails.
 */
export function mergeRows(rows: UploadRow[]): {
  name: string;
  phone: string;
  email: string;
  school: string;
  books: string;
  phones: string[];
  emails: string[];
} {
  const phones = Array.from(new Set(rows.map((r) => r.phone).filter(Boolean)));
  const emails = Array.from(new Set(rows.map((r) => r.email).filter(Boolean)));
  const booksSet = new Set<string>();
  rows.forEach((r) => {
    (r.books || "")
      .split(/[,;]/)
      .map((b) => b.trim())
      .filter(Boolean)
      .forEach((b) => booksSet.add(b));
  });
  const first = rows[0];
  return {
    name: first?.name || "",
    phone: phones[0] || "",
    email: emails[0] || "",
    school: first?.school || "",
    books: Array.from(booksSet).join(", "),
    phones,
    emails,
  };
}
