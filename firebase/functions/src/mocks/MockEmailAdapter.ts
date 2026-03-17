import { IEmailPort } from '../ports';

declare function setTimeout(callback: () => void, ms: number): unknown;

export interface MockEmailLog {
  to: string;
  subject: string;
  html: string;
  timestamp: number;
}

export class MockEmailAdapter implements IEmailPort {
  private sentEmails: MockEmailLog[] = [];
  private shouldFail = false;
  private failureRate = 0;
  private latencyMs = 0;
  private emailCounter = 0;

  async sendEmail(to: string, subject: string, html: string): Promise<{ messageId: string }> {
    if (this.latencyMs > 0) {
      await new Promise<void>(resolve => setTimeout(resolve, this.latencyMs));
    }

    this.emailCounter++;

    if (this.shouldFail || (this.failureRate > 0 && Math.random() < this.failureRate)) {
      throw new Error('Mock Resend API error: service unavailable (503)');
    }

    const messageId = `mock-email-${this.emailCounter}-${Date.now()}`;
    this.sentEmails.push({ to, subject, html, timestamp: Date.now() });
    return { messageId };
  }

  verifyWebhookSignature(_body: string, _signature: string): boolean {
    return true;
  }

  getSentEmails(): MockEmailLog[] { return [...this.sentEmails]; }
  getEmailCount(): number { return this.sentEmails.length; }
  reset(): void { this.sentEmails = []; this.emailCounter = 0; }
  setFailureMode(fail: boolean): void { this.shouldFail = fail; }
  setFailureRate(rate: number): void { this.failureRate = rate; }
  setLatency(ms: number): void { this.latencyMs = ms; }
}
