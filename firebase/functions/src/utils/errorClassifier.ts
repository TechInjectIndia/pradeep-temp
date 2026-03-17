/**
 * Error classification utilities for retry logic and observability.
 * Classifies errors by message patterns and determines retryability.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ErrorType =
  | "RATE_LIMIT"
  | "TIMEOUT"
  | "INVALID_PHONE"
  | "INVALID_EMAIL"
  | "TEMPLATE_ERROR"
  | "API_DOWN"
  | "UNKNOWN";

// ---------------------------------------------------------------------------
// Pattern definitions
// ---------------------------------------------------------------------------

const ERROR_PATTERNS: Array<{ type: ErrorType; patterns: RegExp[] }> = [
  {
    type: "RATE_LIMIT",
    patterns: [
      /rate.?limit/i,
      /too many requests/i,
      /429/,
      /throttl/i,
      /quota.?exceed/i,
    ],
  },
  {
    type: "TIMEOUT",
    patterns: [
      /timeout/i,
      /timed?\s*out/i,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /deadline.?exceeded/i,
    ],
  },
  {
    type: "INVALID_PHONE",
    patterns: [
      /invalid.?phone/i,
      /phone.?number.?invalid/i,
      /not a valid.?phone/i,
      /unregistered.?phone/i,
    ],
  },
  {
    type: "INVALID_EMAIL",
    patterns: [
      /invalid.?email/i,
      /email.?invalid/i,
      /not a valid.?email/i,
      /mailbox.?not.?found/i,
      /undeliverable/i,
    ],
  },
  {
    type: "TEMPLATE_ERROR",
    patterns: [
      /template/i,
      /message.?template/i,
      /template.?not.?found/i,
      /invalid.?template/i,
    ],
  },
  {
    type: "API_DOWN",
    patterns: [
      /ECONNREFUSED/,
      /ECONNRESET/,
      /ENOTFOUND/,
      /503/,
      /502/,
      /service.?unavailable/i,
      /bad.?gateway/i,
      /server.?error/i,
      /internal.?server/i,
    ],
  },
];

// ---------------------------------------------------------------------------
// Retryable error types
// ---------------------------------------------------------------------------

const RETRYABLE_TYPES: Set<ErrorType> = new Set([
  "RATE_LIMIT",
  "API_DOWN",
  "TIMEOUT",
  "UNKNOWN",
]);

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Classify an Error by inspecting its message against known patterns.
 */
export function classifyError(error: Error): ErrorType {
  const message = error.message || "";

  for (const entry of ERROR_PATTERNS) {
    for (const pattern of entry.patterns) {
      if (pattern.test(message)) {
        return entry.type;
      }
    }
  }

  return "UNKNOWN";
}

/**
 * Determine whether an error type is retryable.
 * RATE_LIMIT, API_DOWN, TIMEOUT, and first-occurrence UNKNOWN are retryable.
 */
export function isRetryableError(errorType: string): boolean {
  return RETRYABLE_TYPES.has(errorType as ErrorType);
}

/**
 * Attempt to extract a retry-after timestamp from a rate-limit error.
 * Looks for a `Retry-After` header value (seconds) or an embedded
 * timestamp in the error message. Returns null if none found.
 */
export function getRetryAfterTime(error: Error & { retryAfter?: number | string }): Date | null {
  // Check for an explicit retryAfter property (often set by HTTP clients)
  if (error.retryAfter !== undefined) {
    const seconds = Number(error.retryAfter);
    if (!isNaN(seconds) && seconds > 0) {
      return new Date(Date.now() + seconds * 1000);
    }
    // Could be an HTTP-date string
    const parsed = new Date(String(error.retryAfter));
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  // Try to extract seconds from the error message (e.g. "retry after 30 seconds")
  const messageMatch = (error.message || "").match(/retry.?after\s+(\d+)/i);
  if (messageMatch) {
    const seconds = parseInt(messageMatch[1], 10);
    if (seconds > 0) {
      return new Date(Date.now() + seconds * 1000);
    }
  }

  return null;
}
