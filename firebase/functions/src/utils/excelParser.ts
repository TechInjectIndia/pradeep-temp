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
  recordId?: string;
  booksAssigned?: string;
  teacherOwnerId?: string;
  teacherOwner?: string;
  firstName?: string;
  lastName?: string;
  institutionId?: string;
  institutionName?: string;
  salutation?: string;
}

/** Column name aliases: canonical key -> [alternate header names to try] */
const COLUMN_ALIASES: Record<string, string[]> = {
  name: ['name', 'teacher name', 'teachername'],
  phone: ['phone'],
  email: ['email'],
  school: ['school', 'institution name', 'institutionname', 'instituition name'],
  city: ['city'],
  books: ['books', 'books assigned', 'booksassigned'],
  recordId: ['record id', 'recordid'],
  teacherOwnerId: ['teacher owner.id', 'teacher owner id', 'teacherownerid'],
  teacherOwner: ['teacher owner', 'teacherowner'],
  firstName: ['first name', 'firstname'],
  lastName: ['last name', 'lastname'],
  institutionId: ['institution name.id', 'institution name id', 'institutionid'],
  institutionName: ['institution name', 'institutionname'],
  salutation: ['salutation'],
};

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Converts Excel numeric/scientific-notation values to proper string.
 * Excel stores long numbers (e.g. phone 9997016578) as numbers and may display
 * them as "9.99702E+09" or "222E10". This fixes both raw numbers and such strings.
 */
function toNumericString(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (typeof value === 'number') {
    if (Number.isInteger(value)) return String(value);
    return String(Math.floor(value));
  }
  const s = String(value ?? '').trim();
  if (!s) return '';
  // Match scientific notation: 9.99702E+09, 222E10, 9.99e-5
  if (/^\d*\.?\d+[eE][+-]?\d+$/.test(s)) {
    const num = parseFloat(s);
    if (!Number.isNaN(num)) return String(Math.floor(num));
  }
  return s;
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
    raw: true, // Use raw numbers to avoid scientific notation (e.g. 9997016578 instead of "9.99702E+09")
  });

  return rawRows.map((raw) => {
    const lowerMap: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      lowerMap[normalizeHeader(key)] = toNumericString(value ?? '').trim();
    }

    const get = (canonical: string): string => {
      const aliases = COLUMN_ALIASES[canonical];
      if (aliases) {
        for (const a of aliases) {
          const v = lowerMap[a];
          if (v) return v;
        }
      }
      return lowerMap[canonical] || '';
    };

    const school = get('school') || get('institutionName');
    const books = get('books') || get('booksAssigned');
    const name = get('name') || [get('firstName'), get('lastName')].filter(Boolean).join(' ').trim();

    return {
      name: name || '',
      phone: get('phone') || '',
      email: get('email') || '',
      school: school || '',
      city: get('city') || undefined,
      books: books || '',
      recordId: get('recordId') || undefined,
      booksAssigned: get('booksAssigned') || undefined,
      teacherOwnerId: get('teacherOwnerId') || undefined,
      teacherOwner: get('teacherOwner') || undefined,
      firstName: get('firstName') || undefined,
      lastName: get('lastName') || undefined,
      institutionId: get('institutionId') || undefined,
      institutionName: get('institutionName') || undefined,
      salutation: get('salutation') || undefined,
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
