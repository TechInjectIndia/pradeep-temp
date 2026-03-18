/**
 * Retry a function with exponential backoff.
 * Does NOT retry 4xx errors (client errors are not transient).
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  {
    maxAttempts = 3,
    baseDelayMs = 1000,
    label = 'operation',
  }: { maxAttempts?: number; baseDelayMs?: number; label?: string } = {},
): Promise<T> {
  let lastError: Error = new Error('Unknown error');

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));

      // Don't retry on 4xx client errors
      const is4xx = /HTTP (4\d\d)/.test(lastError.message);
      if (is4xx || attempt === maxAttempts) break;

      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      console.warn(`${label}: attempt ${attempt} failed, retrying in ${delay}ms:`, lastError.message);
      await new Promise((r) => setTimeout(r, delay));
    }
  }

  throw lastError;
}
