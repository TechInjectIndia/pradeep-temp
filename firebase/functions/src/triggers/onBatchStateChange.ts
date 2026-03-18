import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import * as TeacherService from '../services/TeacherService';
import * as SpecimenService from '../services/SpecimenService';
import * as BatchStateMachine from '../services/BatchStateMachine';
import * as BatchLogRepository from '../repositories/BatchLogRepository';

/**
 * Firestore trigger: listens on specimen_batches/{batchId} for status changes.
 *
 * - RESOLVING  → runs teacher resolution, then auto-advances to ORDERING
 * - ORDERING   → enqueues order creation tasks, then auto-advances to MESSAGING
 * - On failure → transitions batch to FAILED so it doesn't hang
 */
export const onBatchStateChange = onDocumentUpdated('specimen_batches/{batchId}', async (event) => {
  const beforeData = event.data?.before?.data();
  const afterData = event.data?.after?.data();

  if (!beforeData || !afterData) {
    console.warn('onBatchStateChange: missing before/after data');
    return;
  }

  const previousStatus: string = beforeData.status;
  const currentStatus: string = afterData.status;

  if (previousStatus === currentStatus) return;

  const batchId: string = event.params.batchId;
  console.log(`Batch ${batchId} transitioned: ${previousStatus} -> ${currentStatus}`);

  switch (currentStatus) {
    case 'RESOLVING': {
      try {
        await BatchLogRepository.append(batchId, {
          step: 'resolution',
          message: 'Starting teacher resolution',
          detail: `Batch transitioned to RESOLVING`,
        });
        await TeacherService.resolveTeachersForBatch(batchId);
        await BatchLogRepository.append(batchId, {
          step: 'resolution',
          message: 'Teacher resolution complete',
          detail: 'All teachers resolved, checking advancement',
        });
        console.log(`Batch ${batchId}: teacher resolution complete, checking advancement`);
        await BatchStateMachine.checkAndAdvanceBatch(batchId);
      } catch (err) {
        console.error(`Batch ${batchId}: teacher resolution failed, marking as FAILED:`, err);
        try {
          await BatchStateMachine.transitionBatch(batchId, 'FAILED', 'resolution_error');
        } catch (transitionErr) {
          console.error(`Batch ${batchId}: failed to transition to FAILED:`, transitionErr);
        }
      }
      break;
    }

    case 'ORDERING': {
      try {
        await BatchLogRepository.append(batchId, {
          step: 'ordering',
          message: 'Starting order creation',
          detail: 'Enqueuing order creation tasks',
        });
        const result = await SpecimenService.createOrdersForBatch(batchId);
        await BatchLogRepository.append(batchId, {
          step: 'ordering',
          message: 'Order creation tasks enqueued',
          detail: `${result.ordersToCreate} orders to create`,
          metadata: { ordersToCreate: result.ordersToCreate },
        });
        console.log(`Batch ${batchId}: enqueued ${result.ordersToCreate} order creation tasks`);
      } catch (err) {
        console.error(`Batch ${batchId}: order creation failed, marking as FAILED:`, err);
        try {
          await BatchStateMachine.transitionBatch(batchId, 'FAILED', 'ordering_error');
        } catch (transitionErr) {
          console.error(`Batch ${batchId}: failed to transition to FAILED:`, transitionErr);
        }
      }
      break;
    }

    default:
      break;
  }
});
