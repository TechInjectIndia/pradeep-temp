import { config } from '../../config';

const QUEUE_TO_WORKER: Record<string, string> = {
  'specimen-orders': 'orderCreationWorker',
  'whatsapp-messages': 'messagingWorker',
  'email-messages': 'messagingWorker',
};

/**
 * Adapter for local/emulator: invokes worker HTTP endpoints directly
 * instead of Cloud Tasks. Use when CLOUD_FUNCTIONS_URL points to localhost.
 */
export async function enqueueTask(
  queueName: string,
  payload: object,
  _delaySeconds?: number,
): Promise<string> {
  const baseUrl = config.cloudTasks.serviceUrl?.replace(/\/$/, '') || '';
  const workerName = QUEUE_TO_WORKER[queueName];

  if (!workerName) {
    throw new Error(`LocalTaskQueue: unknown queue "${queueName}"`);
  }

  const url = `${baseUrl}/${workerName}`;
  const taskId = `local-${queueName}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  console.log(`LocalTaskQueue: invoking ${workerName} at ${url}`);
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) {
        console.error(`LocalTaskQueue: ${workerName} returned ${res.status}`, res.statusText);
      }
    })
    .catch((err) => {
      console.error(`LocalTaskQueue: failed to invoke ${workerName}:`, err);
    });

  return taskId;
}
