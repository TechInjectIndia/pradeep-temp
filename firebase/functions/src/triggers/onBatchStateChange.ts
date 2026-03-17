import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import * as TeacherService from '../services/TeacherService';
import * as SpecimenService from '../services/SpecimenService';

/**
 * Firestore trigger: listens on specimen_batches/{batchId} for updates.
 *
 * Responsibilities:
 *   - Log every status transition for observability
 *   - When status becomes RESOLVING, kick off the resolution pipeline
 *   - When status becomes ORDERING, kick off order creation
 */
export const onBatchStateChange = onDocumentUpdated(
  'specimen_batches/{batchId}',
  async (event) => {
    const beforeData = event.data?.before?.data();
    const afterData = event.data?.after?.data();

    if (!beforeData || !afterData) {
      console.warn('onBatchStateChange: missing before/after data');
      return;
    }

    const previousStatus: string = beforeData.status;
    const currentStatus: string = afterData.status;

    // No status change -- nothing to do
    if (previousStatus === currentStatus) {
      return;
    }

    const batchId: string = event.params.batchId;

    // Log every transition
    console.log(
      `Batch ${batchId} transitioned: ${previousStatus} -> ${currentStatus}`,
    );

    // React to specific status changes
    switch (currentStatus) {
      case 'RESOLVING': {
        console.log(`Batch ${batchId}: starting teacher resolution pipeline`);
        try {
          await TeacherService.resolveTeachersForBatch(batchId);
          console.log(`Batch ${batchId}: teacher resolution complete`);
        } catch (err) {
          console.error(`Batch ${batchId}: teacher resolution failed:`, err);
          // Do not re-throw -- the BatchStateMachine handles error states
        }
        break;
      }

      case 'ORDERING': {
        console.log(`Batch ${batchId}: starting order creation pipeline`);
        try {
          const result = await SpecimenService.createOrdersForBatch(batchId);
          console.log(
            `Batch ${batchId}: enqueued ${result.ordersToCreate} order creation tasks`,
          );
        } catch (err) {
          console.error(`Batch ${batchId}: order creation failed:`, err);
        }
        break;
      }

      default:
        // No automatic action for other status transitions
        break;
    }
  },
);
