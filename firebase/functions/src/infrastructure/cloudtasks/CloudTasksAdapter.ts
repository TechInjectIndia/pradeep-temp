import { CloudTasksClient, protos } from '@google-cloud/tasks';
import { config } from '../../config';

const client = new CloudTasksClient();

/**
 * Enqueue a task to a Cloud Tasks queue.
 *
 * @param queueName - The short name of the queue (e.g. "process-upload")
 * @param payload   - JSON-serialisable object sent as the task body
 * @param delaySeconds - Optional delay before the task is dispatched
 * @returns The full resource name of the created task
 */
export async function enqueueTask(
  queueName: string,
  payload: object,
  delaySeconds?: number,
): Promise<string> {
  const { project, location, serviceUrl } = config.cloudTasks;

  const parent = client.queuePath(project, location, queueName);

  const task: protos.google.cloud.tasks.v2.ITask = {
    httpRequest: {
      httpMethod: 'POST' as const,
      url: `${serviceUrl}/tasks/${queueName}`,
      headers: { 'Content-Type': 'application/json' },
      body: Buffer.from(JSON.stringify(payload)).toString('base64'),
      oidcToken: {
        serviceAccountEmail: `${project}@appspot.gserviceaccount.com`,
      },
    },
  };

  if (delaySeconds && delaySeconds > 0) {
    const scheduleTime = new Date(Date.now() + delaySeconds * 1000);
    task.scheduleTime = {
      seconds: Math.floor(scheduleTime.getTime() / 1000),
      nanos: 0,
    };
  }

  const [response] = await client.createTask({ parent, task });
  return response.name || '';
}
