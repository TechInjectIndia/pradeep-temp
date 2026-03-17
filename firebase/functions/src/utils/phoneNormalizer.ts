/**
 * Phone number normalization utilities for Indian phone numbers.
 * Normalizes to E.164 format (+91XXXXXXXXXX).
 */

const E164_REGEX = /^\+[1-9]\d{6,14}$/;
const INDIAN_MOBILE_REGEX = /^\+91[6-9]\d{9}$/;

/**
 * Normalize a phone number string to E.164 format.
 * Handles common Indian phone number formats:
 *  - Strips spaces, dashes, dots, and parentheses
 *  - 0XXXXXXXXXX  -> +91XXXXXXXXXX
 *  - 91XXXXXXXXXX -> +91XXXXXXXXXX
 *  - XXXXXXXXXX   -> +91XXXXXXXXXX  (10-digit Indian mobile)
 *  - +91XXXXXXXXXX -> kept as-is
 *
 * @throws Error if the result is not a valid E.164 number
 */
export function normalizePhone(phone: string): string {
  // Strip whitespace, dashes, dots, parentheses
  let cleaned = phone.replace(/[\s\-.()\u00A0]/g, "");

  // Remove leading + for uniform processing, we will re-add it
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }

  // If starts with 00 (international dial prefix), strip it
  if (cleaned.startsWith("00")) {
    cleaned = cleaned.substring(2);
  }

  // If starts with 0 and is 11 digits (Indian landline/mobile with trunk prefix)
  if (cleaned.startsWith("0") && cleaned.length === 11) {
    cleaned = "91" + cleaned.substring(1);
  }

  // If exactly 10 digits and starts with 6-9 (Indian mobile), prepend 91
  if (/^[6-9]\d{9}$/.test(cleaned)) {
    cleaned = "91" + cleaned;
  }

  // Re-add the + prefix
  const normalized = "+" + cleaned;

  // Validate E.164 format
  if (!E164_REGEX.test(normalized)) {
    throw new Error(`Invalid phone number: "${phone}" could not be normalized to E.164 format`);
  }

  return normalized;
}

/**
 * Check whether a phone string is a valid E.164 number.
 * Attempts normalization first, so raw user input is accepted.
 */
export function isValidPhone(phone: string): boolean {
  try {
    const normalized = normalizePhone(phone);
    return E164_REGEX.test(normalized);
  } catch {
    return false;
  }
}
