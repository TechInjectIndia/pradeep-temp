import * as crypto from 'crypto';
import { config } from '../../config';
import { withRetry } from '../../utils/retry';

interface WATISendTemplateResponse {
  result: boolean;
  info?: string;
}

/**
 * Send a WhatsApp template message via the WATI API.
 * Retries up to 3 times with exponential backoff on transient errors.
 */
export async function sendTemplate(
  phone: string,
  templateName: string,
  params: Record<string, string>,
): Promise<{ messageId: string }> {
  const { apiUrl, apiKey } = config.wati;

  // WATI expects phone without + (e.g. 919997016578)
  const whatsappNumber = phone.replace(/\D/g, '');
  const parameters = Object.entries(params)
    .filter(([, v]) => v != null && v !== '')
    .map(([name, value]) => ({ name, value }));

  return withRetry(
    async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15_000);

      try {
        const response = await fetch(
          `${apiUrl}/api/v2/sendTemplateMessage?whatsappNumber=${encodeURIComponent(whatsappNumber)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              template_name: templateName,
              broadcast_name: `auto_${Date.now()}`,
              parameters,
              ...(config.wati.channelNumber && {
                channel_number: config.wati.channelNumber,
              }),
            }),
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorBody || response.statusText}`);
        }

        const data = (await response.json()) as WATISendTemplateResponse;
        if (!data.result) {
          throw new Error(`WATI template send failed: ${data.info || 'unknown error'}`);
        }

        return { messageId: data.info || '' };
      } finally {
        clearTimeout(timeout);
      }
    },
    { label: `WATI.sendTemplate(${phone})` },
  );
}

/**
 * Verify the authenticity of a WATI webhook request using HMAC-SHA256.
 * Safely handles mismatched buffer lengths instead of throwing.
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  const { webhookSecret } = config.wati;

  if (!webhookSecret) {
    throw new Error('WATI webhook secret is not configured');
  }

  const expected = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

  // timingSafeEqual throws if buffers have different lengths — check first
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;

  return crypto.timingSafeEqual(sigBuf, expBuf);
}
