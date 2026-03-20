import amqplib from 'amqplib';
import { config } from '@/config';
import { QUEUES } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let connection: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let publishChannel: any = null;

async function getConnection() {
  if (!connection) {
    // amqplib.connect returns a ChannelModel (which has createChannel)
    connection = await amqplib.connect(config.rabbitmq.url);
    connection.on('error', (err: Error) => {
      console.error('[RabbitMQ] Connection error:', err.message);
      connection = null;
      publishChannel = null;
    });
    connection.on('close', () => {
      console.warn('[RabbitMQ] Connection closed — will reconnect on next use');
      connection = null;
      publishChannel = null;
    });
  }
  return connection;
}

async function getPublishChannel() {
  if (!publishChannel) {
    const conn = await getConnection();
    publishChannel = await conn.createChannel();
    for (const queue of Object.values(QUEUES)) {
      await publishChannel.assertQueue(queue, { durable: true });
    }
  }
  return publishChannel;
}

export async function publish(queue: string, payload: unknown): Promise<void> {
  const ch = await getPublishChannel();
  const content = Buffer.from(JSON.stringify(payload));
  ch.sendToQueue(queue, content, { persistent: true });
}

export async function consume(
  queue: string,
  handler: (msg: unknown, ack: () => void, nack: (requeue: boolean) => void) => Promise<void>,
  prefetch = config.rabbitmq.prefetch
): Promise<void> {
  const conn = await getConnection();
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });
  ch.prefetch(prefetch);

  await ch.consume(queue, async (msg: amqplib.ConsumeMessage | null) => {
    if (!msg) return;
    let payload: unknown;
    try {
      payload = JSON.parse(msg.content.toString());
    } catch {
      console.error('[RabbitMQ] Failed to parse message, discarding');
      ch.nack(msg, false, false);
      return;
    }

    await handler(
      payload,
      () => ch.ack(msg),
      (requeue) => ch.nack(msg, false, requeue)
    );
  });

  console.log(`[RabbitMQ] Consuming from: ${queue}`);
}

export async function closeConnection(): Promise<void> {
  try {
    if (publishChannel) await publishChannel.close();
    if (connection) await connection.close();
  } catch {
    // ignore close errors
  } finally {
    publishChannel = null;
    connection = null;
  }
}
