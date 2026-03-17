import { IMessagingPort } from '../ports';

declare function setTimeout(callback: () => void, ms: number): unknown;

export interface MockMessageLog {
  phone: string;
  templateName: string;
  params: Record<string, string>;
  timestamp: number;
}

export class MockMessagingAdapter implements IMessagingPort {
  private sentMessages: MockMessageLog[] = [];
  private shouldFail = false;
  private failureRate = 0; // 0-1, percentage of messages that fail
  private latencyMs = 0;
  private messageCounter = 0;

  async sendTemplate(
    phone: string,
    templateName: string,
    params: Record<string, string>,
  ): Promise<{ messageId: string }> {
    if (this.latencyMs > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, this.latencyMs));
    }

    this.messageCounter++;

    if (this.shouldFail || (this.failureRate > 0 && Math.random() < this.failureRate)) {
      throw new Error('Mock WATI API error: rate limit exceeded (429)');
    }

    const messageId = `mock-wa-${this.messageCounter}-${Date.now()}`;
    this.sentMessages.push({ phone, templateName, params, timestamp: Date.now() });
    return { messageId };
  }

  verifyWebhookSignature(_body: string, _signature: string): boolean {
    return true; // Always passes in mock
  }

  // Test helpers
  getSentMessages(): MockMessageLog[] {
    return [...this.sentMessages];
  }
  getMessageCount(): number {
    return this.sentMessages.length;
  }
  reset(): void {
    this.sentMessages = [];
    this.messageCounter = 0;
  }
  setFailureMode(fail: boolean): void {
    this.shouldFail = fail;
  }
  setFailureRate(rate: number): void {
    this.failureRate = rate;
  }
  setLatency(ms: number): void {
    this.latencyMs = ms;
  }
}
