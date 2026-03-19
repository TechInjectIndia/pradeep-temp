import type { IOrderPort } from '../../ports/IOrderPort';
import type { ExternalOrderPayload, ExternalOrderResponse } from '../../types/order';

/**
 * Production adapter — POSTs to the configured external Order API and returns
 * the teacher × product → links[] response.
 *
 * Set ORDER_API_URL in config.env (e.g. https://api.yourplatform.com/orders).
 */
export class ExternalOrderAdapter implements IOrderPort {
  private readonly apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async createOrders(payload: ExternalOrderPayload): Promise<ExternalOrderResponse> {
    if (!this.apiUrl) {
      throw new Error('ORDER_API_URL is not configured. Set it in config.env.');
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`Order API responded with ${response.status}: ${text}`);
    }

    return response.json() as Promise<ExternalOrderResponse>;
  }
}
