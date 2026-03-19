import type { ExternalOrderPayload, ExternalOrderResponse } from '../types/order';

/**
 * Port for the external Order API.
 *
 * Production implementation: HTTP POST to ORDER_API_URL
 * Local/emulator implementation: generates specimen URLs internally
 */
export interface IOrderPort {
  /**
   * Create specimen orders for every teacher × product pair in the payload.
   * Returns the generated access links keyed by teacherRecordId → productId.
   */
  createOrders(payload: ExternalOrderPayload): Promise<ExternalOrderResponse>;
}
