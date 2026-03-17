/**
 * Port interface for WhatsApp / messaging adapters.
 *
 * Any concrete adapter (e.g. WATIAdapter) must satisfy this contract.
 */
export interface IMessagingPort {
  /**
   * Send a template message to the given phone number.
   *
   * @param phone        - Recipient phone number (E.164 format recommended).
   * @param templateName - Name of the pre-approved message template.
   * @param params       - Key-value pairs to interpolate into the template.
   * @returns An object containing the provider-assigned message ID.
   */
  sendTemplate(
    phone: string,
    templateName: string,
    params: Record<string, string>,
  ): Promise<{ messageId: string }>;

  /**
   * Verify the authenticity of an incoming webhook request.
   *
   * @param body      - Raw request body as a string.
   * @param signature - Signature header value supplied by the provider.
   * @returns `true` when the signature is valid.
   */
  verifyWebhookSignature(body: string, signature: string): boolean;
}
