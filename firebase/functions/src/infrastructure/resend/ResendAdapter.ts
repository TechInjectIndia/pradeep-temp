import { Resend } from 'resend';
import * as crypto from 'crypto';
import { config } from '../../config';
import { withRetry } from '../../utils/retry';

let resendClient: Resend | null = null;

function getClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(config.resend.apiKey);
  }
  return resendClient;
}

/**
 * Send an email via the Resend API.
 * Retries up to 3 times with exponential backoff on transient errors.
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<{ messageId: string }> {
  return withRetry(
    async () => {
      const client = getClient();
      const { data, error } = await client.emails.send({
        from: config.resend.fromEmail,
        to,
        subject,
        html,
      });

      if (error) {
        throw new Error(`Resend email error: ${error.message}`);
      }

      return { messageId: data?.id || '' };
    },
    { label: `Resend.sendEmail(${to})` },
  );
}

/**
 * Verify the authenticity of a Resend webhook request using HMAC-SHA256.
 * Safely handles mismatched buffer lengths instead of throwing.
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  const { webhookSecret } = config.resend;

  if (!webhookSecret) {
    throw new Error('Resend webhook secret is not configured');
  }

  const expected = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

  // timingSafeEqual throws if buffers have different lengths — check first
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expBuf);
}
