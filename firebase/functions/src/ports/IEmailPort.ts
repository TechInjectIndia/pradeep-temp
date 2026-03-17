/**
 * Port interface for email adapters.
 *
 * Any concrete adapter (e.g. ResendAdapter) must satisfy this contract.
 */
export interface IEmailPort {
  /**
   * Send an email.
   *
   * @param to      - Recipient email address.
   * @param subject - Email subject line.
   * @param html    - Email body as HTML.
   * @returns An object containing the provider-assigned message ID.
   */
  sendEmail(
    to: string,
    subject: string,
    html: string,
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
