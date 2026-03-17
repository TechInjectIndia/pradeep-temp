import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import * as MessagingService from '../services/MessagingService';

/**
 * Firestore trigger: listens on temp_aggregation/{aggregationKey} for updates.
 *
 * When isComplete transitions from false to true, enqueue the messaging task
 * for this teacher so their specimen links get delivered.
 */
export const onAggregationComplete = onDocumentUpdated(
  'temp_aggregation/{aggregationKey}',
  async (event) => {
    const beforeData = event.data?.before?.data();
    const afterData = event.data?.after?.data();

    if (!beforeData || !afterData) {
      console.warn('onAggregationComplete: missing before/after data');
      return;
    }

    const wasComplete = beforeData.isComplete === true;
    const isNowComplete = afterData.isComplete === true;

    // Only act when isComplete transitions from false to true
    if (wasComplete || !isNowComplete) {
      return;
    }

    const batchId: string = afterData.batchId;
    const aggregationKey: string = event.params.aggregationKey;

    console.log(
      `Aggregation ${aggregationKey} completed for batch ${batchId}. Enqueuing messages.`,
    );

    try {
      const result = await MessagingService.enqueueMessagesForBatch(batchId);
      console.log(`Enqueued ${result.totalMessages} messages for batch ${batchId}`);
    } catch (err) {
      console.error(
        `Failed to enqueue messages for batch ${batchId} (aggregation ${aggregationKey}):`,
        err,
      );
      throw err; // Re-throw to let Cloud Functions retry
    }
  },
);
