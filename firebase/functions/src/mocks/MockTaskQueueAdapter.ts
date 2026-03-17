import { ITaskQueuePort } from '../ports';

export interface MockTask {
  queueName: string;
  payload: object;
  delaySeconds?: number;
  createdAt: number;
}

export class MockTaskQueueAdapter implements ITaskQueuePort {
  private tasks: MockTask[] = [];
  private taskCounter = 0;
  private shouldFail = false;

  async enqueueTask(queueName: string, payload: object, delaySeconds?: number): Promise<string> {
    if (this.shouldFail) {
      throw new Error('Mock Cloud Tasks error: queue not found');
    }

    this.taskCounter++;
    const taskName = `mock-task-${this.taskCounter}`;
    this.tasks.push({ queueName, payload, delaySeconds, createdAt: Date.now() });
    return taskName;
  }

  // Test helpers
  getTasks(): MockTask[] { return [...this.tasks]; }
  getTasksByQueue(queueName: string): MockTask[] { return this.tasks.filter(t => t.queueName === queueName); }
  getTaskCount(): number { return this.tasks.length; }
  reset(): void { this.tasks = []; this.taskCounter = 0; }
  setFailureMode(fail: boolean): void { this.shouldFail = fail; }
}
