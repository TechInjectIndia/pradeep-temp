import { Resend } from 'resend';
import * as crypto from 'crypto';
import { config } from '../../config';

let resendClient: Resend | null = null;

function getClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(config.resend.apiKey);
  }
  return resendClient;
}

/**
 * Send an email via the Resend API.
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<{ messageId: string }> {
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
}

/**
 * Verify the authenticity of a Resend webhook request using HMAC-SHA256.
 */
export function verifyWebhookSignature(
  body: string,
  signature: string
): boolean {
  const { webhookSecret } = config.resend;

  if (!webhookSecret) {
    throw new Error('Resend webhook secret is not configured');
  }

  const expected = crypto
    .createHmac('sha256', webhookSecret)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
