import type { IOrderPort } from '../../ports/IOrderPort';
import type { ExternalOrderPayload, ExternalOrderResponse } from '../../types/order';
import { config } from '../../config';

/**
 * Local / emulator adapter — generates specimen URLs internally without calling
 * any external service. Used automatically when ORDER_API_URL is not set or
 * when running the Firebase emulator.
 *
 * Generated URL pattern:
 *   {specimenBaseUrl}/view/{batchId}/{teacherRecordId}/{productId}
 */
export class LocalOrderAdapter implements IOrderPort {
  async createOrders(payload: ExternalOrderPayload): Promise<ExternalOrderResponse> {
    const { batchId, teachers } = payload;
    const base = (
      config.app.specimenBaseUrl || 'https://specimens.example.com'
    ).replace(/\/$/, '');

    const result: Record<string, Record<string, string>> = {};

    for (const [teacherRecordId, productIds] of Object.entries(teachers)) {
      result[teacherRecordId] = {};
      for (const productId of productIds) {
        result[teacherRecordId][productId] =
          `${base}/view/${batchId}/${teacherRecordId}/${productId}`;
      }
    }

    return { batchId, teachers: result };
  }
}
