/**
 * Excel file parsing and row validation utilities.
 * Uses the `xlsx` library to read workbook buffers and validates
 * each row against required field rules.
 */

import * as XLSX from 'xlsx';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ParsedRow {
  name: string;
  phone: string;
  email: string;
  school: string;
  city?: string;
  books: string;
}

export interface ValidationError {
  row: number;
  message: string;
}

export interface ValidationResult {
  valid: ParsedRow[];
  errors: ValidationError[];
}

// ---------------------------------------------------------------------------
// Email regex (simple but sufficient for validation)
// ---------------------------------------------------------------------------

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Parse an Excel buffer and return an array of row objects.
 * Reads the first sheet of the workbook. Column headers are matched
 * case-insensitively and trimmed.
 */
export function parseExcelBuffer(buffer: Buffer): Array<{
  name: string;
  phone: string;
  email: string;
  school: string;
  city?: string;
  books: string;
}> {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error('Excel file contains no sheets');
  }

  const sheet = workbook.Sheets[sheetName];
  const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet, {
    defval: '',
  });

  return rawRows.map((raw) => {
    // Build a lowercase-key map so column header casing doesn't matter
    const lowerMap: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      lowerMap[key.trim().toLowerCase()] = String(value ?? '').trim();
    }

    return {
      name: lowerMap['name'] || '',
      phone: lowerMap['phone'] || '',
      email: lowerMap['email'] || '',
      school: lowerMap['school'] || '',
      city: lowerMap['city'] || undefined,
      books: lowerMap['books'] || '',
    };
  });
}

/**
 * Validate an array of parsed rows.
 * Rules:
 *  - name: required (non-empty)
 *  - phone: required, minimum 5 characters
 *  - email: required, must match basic email format
 *  - school: required (non-empty)
 *  - books: required (non-empty)
 *
 * @param rows - Raw row objects (typically from parseExcelBuffer)
 * @returns Object containing valid rows and an array of per-row errors
 */
export function validateRows(rows: Array<Record<string, unknown>>): ValidationResult {
  const valid: ParsedRow[] = [];
  const errors: ValidationError[] = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2; // +2 because row 1 is the header, data starts at row 2
    const rowErrors: string[] = [];

    const name = String(row.name ?? '').trim();
    const phone = String(row.phone ?? '').trim();
    const email = String(row.email ?? '').trim();
    const school = String(row.school ?? '').trim();
    const books = String(row.books ?? '').trim();
    const city =
      row.city !== undefined && row.city !== null
        ? String(row.city).trim() || undefined
        : undefined;

    if (!name) {
      rowErrors.push('name is required');
    }

    if (!phone || phone.length < 5) {
      rowErrors.push('phone must be at least 5 characters');
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      rowErrors.push('email must be a valid email address');
    }

    if (!school) {
      rowErrors.push('school is required');
    }

    if (!books) {
      rowErrors.push('books is required');
    }

    if (rowErrors.length > 0) {
      errors.push({ row: rowNumber, message: rowErrors.join('; ') });
    } else {
      valid.push({ name, phone, email, school, city, books });
    }
  });

  return { valid, errors };
}
