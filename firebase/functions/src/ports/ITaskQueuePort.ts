/**
 * Port interface for task-queue adapters (e.g. Google Cloud Tasks).
 */
export interface ITaskQueuePort {
  /**
   * Enqueue a task for asynchronous processing.
   *
   * @param queueName    - Logical name of the target queue.
   * @param payload      - JSON-serialisable object sent as the task body.
   * @param delaySeconds - Optional delay (in seconds) before the task is dispatched.
   * @returns The provider-assigned task identifier / resource name.
   */
  enqueueTask(
    queueName: string,
    payload: object,
    delaySeconds?: number,
  ): Promise<string>;
}
