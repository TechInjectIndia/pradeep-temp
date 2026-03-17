import * as admin from 'firebase-admin';
import * as BatchRepository from '../repositories/BatchRepository';
import { db } from '../infrastructure/firestore/FirestoreAdapter';

// ---------------------------------------------------------------------------
// Batch status constants and valid transitions
// ---------------------------------------------------------------------------

export const BatchStatus = {
  CREATED: 'CREATED',
  VALIDATING: 'VALIDATING',
  RESOLVING: 'RESOLVING',
  ORDERING: 'ORDERING',
  MESSAGING: 'MESSAGING',
  COMPLETE: 'COMPLETE',
  PARTIAL_FAILURE: 'PARTIAL_FAILURE',
  PAUSED: 'PAUSED',
  CANCELLED: 'CANCELLED',
  FAILED: 'FAILED',
} as const;

/**
 * Map of each status to the set of statuses it may transition into.
 */
export const VALID_TRANSITIONS: Record<string, string[]> = {
  [BatchStatus.CREATED]: [BatchStatus.VALIDATING, BatchStatus.CANCELLED],
  [BatchStatus.VALIDATING]: [BatchStatus.RESOLVING, BatchStatus.FAILED, BatchStatus.CANCELLED],
  [BatchStatus.RESOLVING]: [
    BatchStatus.ORDERING,
    BatchStatus.PAUSED,
    BatchStatus.FAILED,
    BatchStatus.CANCELLED,
  ],
  [BatchStatus.ORDERING]: [
    BatchStatus.MESSAGING,
    BatchStatus.PAUSED,
    BatchStatus.FAILED,
    BatchStatus.CANCELLED,
  ],
  [BatchStatus.MESSAGING]: [
    BatchStatus.COMPLETE,
    BatchStatus.PARTIAL_FAILURE,
    BatchStatus.PAUSED,
    BatchStatus.FAILED,
    BatchStatus.CANCELLED,
  ],
  [BatchStatus.PAUSED]: [
    BatchStatus.RESOLVING,
    BatchStatus.ORDERING,
    BatchStatus.MESSAGING,
    BatchStatus.CANCELLED,
  ],
  [BatchStatus.PARTIAL_FAILURE]: [BatchStatus.MESSAGING, BatchStatus.CANCELLED],
  // Terminal states have no outgoing transitions
  [BatchStatus.COMPLETE]: [],
  [BatchStatus.CANCELLED]: [],
  [BatchStatus.FAILED]: [BatchStatus.CREATED],
};

const FieldValue = admin.firestore.FieldValue;

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Transition a batch to the target status.
 *
 * Validates the transition against VALID_TRANSITIONS and performs the update
 * inside a Firestore transaction to prevent race conditions.
 */
export async function transitionBatch(
  batchId: string,
  targetStatus: string,
  trigger: string,
): Promise<void> {
  const batchRef = db.collection('specimen_batches').doc(batchId);

  await db.runTransaction(async (transaction: admin.firestore.Transaction) => {
    const snap = await transaction.get(batchRef);
    if (!snap.exists) {
      throw new Error(`Batch ${batchId} not found`);
    }

    const data = snap.data()!;
    const currentStatus: string = data.status;

    // Validate the transition
    const allowed = VALID_TRANSITIONS[currentStatus];
    if (!allowed || !allowed.includes(targetStatus)) {
      throw new Error(
        `Invalid batch transition: ${currentStatus} -> ${targetStatus} (batch ${batchId})`,
      );
    }

    const now = FieldValue.serverTimestamp();
    const historyEntry = {
      from: currentStatus,
      to: targetStatus,
      trigger,
      timestamp: new Date().toISOString(),
    };

    transaction.update(batchRef, {
      status: targetStatus,
      previousStatus: currentStatus,
      statusChangedAt: now,
      statusHistory: FieldValue.arrayUnion(historyEntry),
      updatedAt: now,
    });
  });
}

/**
 * Pause a batch, recording the stage it was paused at.
 */
export async function pauseBatch(batchId: string): Promise<void> {
  const batch = await BatchRepository.getById(batchId);
  if (!batch) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const currentStatus: string = (batch as any).status;

  await transitionBatch(batchId, BatchStatus.PAUSED, 'manual_pause');

  // Store the stage the batch was paused at so we can resume later
  await BatchRepository.update(batchId, {
    pausedAt: new Date().toISOString(),
    pausedFromStage: currentStatus,
  });
}

/**
 * Resume a paused batch, returning it to the stage it was in before pausing.
 */
export async function resumeBatch(batchId: string): Promise<void> {
  const batch = await BatchRepository.getById(batchId);
  if (!batch) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const batchData = batch as any;
  if (batchData.status !== BatchStatus.PAUSED) {
    throw new Error(`Batch ${batchId} is not paused (current status: ${batchData.status})`);
  }

  const resumeToStage: string = batchData.pausedFromStage;
  if (!resumeToStage) {
    throw new Error(`Batch ${batchId} has no recorded pausedFromStage`);
  }

  await transitionBatch(batchId, resumeToStage, 'manual_resume');

  await BatchRepository.update(batchId, {
    resumedAt: new Date().toISOString(),
    pausedAt: null,
    pausedFromStage: null,
  });
}

/**
 * Cancel a batch, optionally recording a reason.
 */
export async function cancelBatch(batchId: string, reason?: string): Promise<void> {
  await transitionBatch(batchId, BatchStatus.CANCELLED, 'manual_cancel');

  const updates: Record<string, unknown> = {
    cancelledAt: new Date().toISOString(),
  };
  if (reason) {
    updates.cancelReason = reason;
  }

  await BatchRepository.update(batchId, updates);
}

/**
 * Inspect batch stats and advance to the next logical state if conditions
 * are met.
 *
 * Progression rules:
 *   RESOLVING  -> ORDERING    when all raw teachers are resolved
 *   ORDERING   -> MESSAGING   when all orders are created
 *   MESSAGING  -> COMPLETE    when all messages are delivered (no failures)
 *   MESSAGING  -> PARTIAL_FAILURE when all messages processed but some failed
 */
export async function checkAndAdvanceBatch(batchId: string): Promise<void> {
  const batch = await BatchRepository.getById(batchId);
  if (!batch) {
    throw new Error(`Batch ${batchId} not found`);
  }

  const batchData = batch as any;
  const status: string = batchData.status;
  const stats = batchData.stats || {};

  switch (status) {
    case BatchStatus.RESOLVING: {
      const totalTeachers: number = stats.totalTeachers || 0;
      const resolved: number = stats.teachersResolved || 0;
      const errors: number = stats.resolutionErrors || 0;

      if (totalTeachers > 0 && resolved + errors >= totalTeachers) {
        await transitionBatch(batchId, BatchStatus.ORDERING, 'auto_advance_all_resolved');
      }
      break;
    }

    case BatchStatus.ORDERING: {
      const expectedOrders: number = stats.expectedOrders || stats.teachersResolved || 0;
      const ordersCreated: number = stats.ordersCreated || 0;

      if (expectedOrders > 0 && ordersCreated >= expectedOrders) {
        await transitionBatch(batchId, BatchStatus.MESSAGING, 'auto_advance_all_orders_created');
      }
      break;
    }

    case BatchStatus.MESSAGING: {
      const messagesQueued: number = stats.messagesQueued || 0;
      const messagesDelivered: number = stats.messagesDelivered || 0;
      const messagesFailed: number = stats.messagesFailed || 0;
      const dlqMessages: number = stats.dlqMessages || 0;
      const totalProcessed = messagesDelivered + messagesFailed + dlqMessages;

      if (messagesQueued > 0 && totalProcessed >= messagesQueued) {
        if (messagesFailed === 0 && dlqMessages === 0) {
          await transitionBatch(batchId, BatchStatus.COMPLETE, 'auto_advance_all_delivered');
        } else {
          await transitionBatch(batchId, BatchStatus.PARTIAL_FAILURE, 'auto_advance_with_failures');
        }
      }
      break;
    }

    default:
      // No automatic advancement for other states
      break;
  }
}
