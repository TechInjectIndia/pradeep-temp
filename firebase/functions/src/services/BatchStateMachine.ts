import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import * as BatchRepository from '../repositories/BatchRepository';
import * as BatchLogRepository from '../repositories/BatchLogRepository';
import { db } from '../infrastructure/firestore/FirestoreAdapter';

// ---------------------------------------------------------------------------
// Batch status constants and valid transitions
// ---------------------------------------------------------------------------

export const BatchStatus = {
  CREATED: 'CREATED',
  UPLOADED: 'UPLOADED',
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

export const VALID_TRANSITIONS: Record<string, string[]> = {
  [BatchStatus.CREATED]: [BatchStatus.VALIDATING, BatchStatus.CANCELLED],
  [BatchStatus.UPLOADED]: [BatchStatus.VALIDATING, BatchStatus.CANCELLED],
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
  [BatchStatus.COMPLETE]: [],
  [BatchStatus.CANCELLED]: [],
  [BatchStatus.FAILED]: [BatchStatus.CREATED],
};


// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Transition a batch to the target status inside a Firestore transaction.
 */
export async function transitionBatch(
  batchId: string,
  targetStatus: string,
  trigger: string,
  extraFields?: Record<string, unknown>,
): Promise<void> {
  const batchRef = db.collection('specimen_batches').doc(batchId);
  let fromStatus = '';

  await db.runTransaction(async (transaction: admin.firestore.Transaction) => {
    const snap = await transaction.get(batchRef);
    if (!snap.exists) throw new Error(`Batch ${batchId} not found`);

    const data = snap.data()!;
    const currentStatus: string = data.status;
    fromStatus = currentStatus;

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
      ...(extraFields || {}),
    });
  });

  BatchLogRepository.append(batchId, {
    step: 'batch_advanced',
    message: `Batch advanced: ${fromStatus} → ${targetStatus}`,
    detail: `Trigger: ${trigger}`,
    metadata: { from: fromStatus, to: targetStatus, trigger },
  }).catch((e) => console.error('BatchLog append failed:', e));
}

/**
 * Pause a batch atomically — stores pausedFromStage in the same transaction
 * as the status transition to prevent partial updates.
 */
export async function pauseBatch(batchId: string): Promise<void> {
  const batchRef = db.collection('specimen_batches').doc(batchId);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(batchRef);
    if (!snap.exists) throw new Error(`Batch ${batchId} not found`);

    const data = snap.data()!;
    const currentStatus: string = data.status;

    const allowed = VALID_TRANSITIONS[currentStatus];
    if (!allowed || !allowed.includes(BatchStatus.PAUSED)) {
      throw new Error(
        `Invalid batch transition: ${currentStatus} -> PAUSED (batch ${batchId})`,
      );
    }

    const now = FieldValue.serverTimestamp();
    tx.update(batchRef, {
      status: BatchStatus.PAUSED,
      previousStatus: currentStatus,
      pausedFromStage: currentStatus, // stored atomically — no split-brain
      pausedAt: new Date().toISOString(),
      statusChangedAt: now,
      statusHistory: FieldValue.arrayUnion({
        from: currentStatus,
        to: BatchStatus.PAUSED,
        trigger: 'manual_pause',
        timestamp: new Date().toISOString(),
      }),
      updatedAt: now,
    });
  });
}

/**
 * Resume a paused batch, returning it to the stage it was paused from.
 */
export async function resumeBatch(batchId: string): Promise<void> {
  const batchRef = db.collection('specimen_batches').doc(batchId);

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(batchRef);
    if (!snap.exists) throw new Error(`Batch ${batchId} not found`);

    const data = snap.data()!;
    if (data.status !== BatchStatus.PAUSED) {
      throw new Error(`Batch ${batchId} is not paused (current status: ${data.status})`);
    }

    const resumeToStage: string = data.pausedFromStage;
    if (!resumeToStage) {
      throw new Error(`Batch ${batchId} has no recorded pausedFromStage`);
    }

    const allowed = VALID_TRANSITIONS[BatchStatus.PAUSED];
    if (!allowed.includes(resumeToStage)) {
      throw new Error(`Cannot resume batch ${batchId} to stage ${resumeToStage}`);
    }

    const now = FieldValue.serverTimestamp();
    tx.update(batchRef, {
      status: resumeToStage,
      previousStatus: BatchStatus.PAUSED,
      pausedFromStage: FieldValue.delete(),
      pausedAt: FieldValue.delete(),
      resumedAt: new Date().toISOString(),
      statusChangedAt: now,
      statusHistory: FieldValue.arrayUnion({
        from: BatchStatus.PAUSED,
        to: resumeToStage,
        trigger: 'manual_resume',
        timestamp: new Date().toISOString(),
      }),
      updatedAt: now,
    });
  });
}

/**
 * Cancel a batch, optionally recording a reason.
 */
export async function cancelBatch(batchId: string, reason?: string): Promise<void> {
  await transitionBatch(batchId, BatchStatus.CANCELLED, 'manual_cancel', {
    cancelledAt: new Date().toISOString(),
    ...(reason ? { cancelReason: reason } : {}),
  });
}

/**
 * Inspect batch stats and advance to the next logical state if conditions are met.
 */
export async function checkAndAdvanceBatch(batchId: string): Promise<void> {
  const batch = await BatchRepository.getById(batchId);
  if (!batch) throw new Error(`Batch ${batchId} not found`);

  const batchData = batch as any;
  const status: string = batchData.status;
  const stats = batchData.stats || {};

  switch (status) {
    case BatchStatus.RESOLVING: {
      const totalTeachers: number = stats.totalTeachers || 0;
      const resolved: number = stats.teachersResolved || 0;
      const errors: number = stats.resolutionErrors || 0;

      if (totalTeachers > 0 && resolved + errors >= totalTeachers) {
        await safeTransition(batchId, BatchStatus.ORDERING, 'auto_advance_all_resolved');
      }
      break;
    }

    case BatchStatus.ORDERING: {
      const expectedOrders: number = stats.expectedOrders || stats.teachersResolved || 0;
      const ordersCreated: number = stats.ordersCreated || 0;

      if (expectedOrders > 0 && ordersCreated >= expectedOrders) {
        await safeTransition(batchId, BatchStatus.MESSAGING, 'auto_advance_all_orders_created');
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
          await safeTransition(batchId, BatchStatus.COMPLETE, 'auto_advance_all_delivered');
        } else {
          await safeTransition(batchId, BatchStatus.PARTIAL_FAILURE, 'auto_advance_with_failures');
        }
      }
      break;
    }

    default:
      break;
  }
}

/**
 * Attempt a batch transition, silently ignoring "already advanced" errors.
 * Multiple concurrent workers (order/messaging) each call checkAndAdvanceBatch
 * after completing their task. Only the first one to hit the threshold should
 * transition; the rest will find the batch already in the new state and must
 * not throw.
 */
async function safeTransition(batchId: string, targetStatus: string, trigger: string): Promise<void> {
  try {
    await transitionBatch(batchId, targetStatus, trigger);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('Invalid batch transition')) {
      // Another concurrent worker already advanced the state — this is expected.
      console.log(`checkAndAdvanceBatch: transition to ${targetStatus} skipped (already advanced) for batch ${batchId}`);
      return;
    }
    throw err;
  }
}
