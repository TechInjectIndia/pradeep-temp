/**
 * Interface for managing batch lifecycle state transitions.
 */
export interface IBatchStateMachine {
  transitionBatch(batchId: string, targetStatus: string, trigger: string): Promise<void>;
  pauseBatch(batchId: string): Promise<void>;
  resumeBatch(batchId: string): Promise<void>;
  cancelBatch(batchId: string, reason?: string): Promise<void>;
}
