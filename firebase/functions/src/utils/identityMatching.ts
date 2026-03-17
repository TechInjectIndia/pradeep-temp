/**
 * Identity matching utilities for teacher deduplication.
 * Provides name similarity (Jaro-Winkler), school similarity,
 * phonetic key generation (Soundex), and confidence scoring.
 */

// ---------------------------------------------------------------------------
// Jaro-Winkler distance
// ---------------------------------------------------------------------------

/**
 * Compute the Jaro similarity between two strings (0..1).
 */
function jaroSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1;
  if (s1.length === 0 || s2.length === 0) return 0;

  const matchWindow = Math.max(0, Math.floor(Math.max(s1.length, s2.length) / 2) - 1);

  const s1Matches = new Array<boolean>(s1.length).fill(false);
  const s2Matches = new Array<boolean>(s2.length).fill(false);

  let matches = 0;
  let transpositions = 0;

  // Find matches
  for (let i = 0; i < s1.length; i++) {
    const start = Math.max(0, i - matchWindow);
    const end = Math.min(i + matchWindow + 1, s2.length);

    for (let j = start; j < end; j++) {
      if (s2Matches[j] || s1[i] !== s2[j]) continue;
      s1Matches[i] = true;
      s2Matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches === 0) return 0;

  // Count transpositions
  let k = 0;
  for (let i = 0; i < s1.length; i++) {
    if (!s1Matches[i]) continue;
    while (!s2Matches[k]) k++;
    if (s1[i] !== s2[k]) transpositions++;
    k++;
  }

  return (matches / s1.length + matches / s2.length + (matches - transpositions / 2) / matches) / 3;
}

/**
 * Compute the Jaro-Winkler similarity between two strings (0..1).
 * Applies a prefix bonus for strings that share a common prefix (up to 4 chars).
 */
function jaroWinkler(s1: string, s2: string, prefixScale = 0.1): number {
  const jaro = jaroSimilarity(s1, s2);

  // Common prefix length (max 4)
  let prefixLen = 0;
  const maxPrefix = Math.min(4, Math.min(s1.length, s2.length));
  for (let i = 0; i < maxPrefix; i++) {
    if (s1[i] === s2[i]) {
      prefixLen++;
    } else {
      break;
    }
  }

  return jaro + prefixLen * prefixScale * (1 - jaro);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Calculate name similarity using Jaro-Winkler distance.
 * @returns Score from 0 to 100.
 */
export function calculateNameSimilarity(name1: string, name2: string): number {
  const a = name1.trim().toLowerCase();
  const b = name2.trim().toLowerCase();

  if (a === b) return 100;
  if (a.length === 0 || b.length === 0) return 0;

  const score = jaroWinkler(a, b);
  return Math.round(score * 100);
}

/**
 * Calculate school name similarity.
 * Exact match (case-insensitive) yields 100; otherwise uses Jaro-Winkler.
 * @returns Score from 0 to 100.
 */
export function calculateSchoolSimilarity(school1: string, school2: string): number {
  const a = school1.trim().toLowerCase();
  const b = school2.trim().toLowerCase();

  if (a === b) return 100;
  if (a.length === 0 || b.length === 0) return 0;

  const score = jaroWinkler(a, b);
  return Math.round(score * 100);
}

/**
 * Generate a Soundex phonetic key for a name.
 * Returns a 4-character Soundex code (e.g. "R163" for "Robert").
 */
export function generatePhoneticKey(name: string): string {
  const cleaned = name
    .trim()
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
  if (cleaned.length === 0) return '';

  const codeMap: Record<string, string> = {
    B: '1',
    F: '1',
    P: '1',
    V: '1',
    C: '2',
    G: '2',
    J: '2',
    K: '2',
    Q: '2',
    S: '2',
    X: '2',
    Z: '2',
    D: '3',
    T: '3',
    L: '4',
    M: '5',
    N: '5',
    R: '6',
  };

  let soundex = cleaned[0];
  let lastCode = codeMap[cleaned[0]] || '0';

  for (let i = 1; i < cleaned.length && soundex.length < 4; i++) {
    const code = codeMap[cleaned[i]];
    if (code && code !== lastCode) {
      soundex += code;
    }
    // H and W are ignored but do not break coding of surrounding letters
    if (cleaned[i] !== 'H' && cleaned[i] !== 'W') {
      lastCode = code || '0';
    }
  }

  return soundex.padEnd(4, '0');
}

/**
 * Calculate a weighted confidence score from multiple identity signals.
 *
 * Weights:
 *  - nameScore  : 0..40 points (linear from nameScore 0..100)
 *  - schoolScore: exact (100) -> 30 pts; similar (>0, <100) -> 0..20 pts linear
 *  - cityMatch  : +10 points
 *
 * @returns Score from 0 to 80.
 */
export function calculateConfidenceScore(signals: {
  nameScore: number;
  schoolScore: number;
  cityMatch: boolean;
}): number {
  const { nameScore, schoolScore, cityMatch } = signals;

  // Name contribution: 0-40
  const nameContribution = (Math.min(Math.max(nameScore, 0), 100) / 100) * 40;

  // School contribution: exact match = 30, otherwise 0-20
  let schoolContribution: number;
  if (schoolScore === 100) {
    schoolContribution = 30;
  } else {
    schoolContribution = (Math.min(Math.max(schoolScore, 0), 100) / 100) * 20;
  }

  // City contribution: 10 if match
  const cityContribution = cityMatch ? 10 : 0;

  return Math.round(nameContribution + schoolContribution + cityContribution);
}
