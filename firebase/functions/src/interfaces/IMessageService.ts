/**
 * Service interface for sending messages via WhatsApp or email.
 */
export interface IMessageService {
  sendMessage(
    phone: string,
    channel: 'whatsapp' | 'email',
    payload: any,
  ): Promise<{ messageId: string }>;
}
