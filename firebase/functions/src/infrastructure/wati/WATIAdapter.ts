import * as crypto from 'crypto';
import { config } from '../../config';

interface WATISendTemplateResponse {
  result: boolean;
  info?: string;
}

/**
 * Send a WhatsApp template message via the WATI API.
 */
export async function sendTemplate(
  phone: string,
  templateName: string,
  params: Record<string, string>,
): Promise<{ messageId: string }> {
  const { apiUrl, apiKey } = config.wati;

  const parameters = Object.entries(params).map(([name, value]) => ({
    name,
    value,
  }));

  const response = await fetch(
    `${apiUrl}/api/v1/sendTemplateMessage/${encodeURIComponent(phone)}`,
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
      }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`WATI API error (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as WATISendTemplateResponse;

  if (!data.result) {
    throw new Error(`WATI template send failed: ${data.info || 'unknown error'}`);
  }

  return { messageId: data.info || '' };
}

/**
 * Verify the authenticity of a WATI webhook request using HMAC-SHA256.
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
  const { webhookSecret } = config.wati;

  if (!webhookSecret) {
    throw new Error('WATI webhook secret is not configured');
  }

  const expected = crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
