import { BatchStatus } from './enums';

/**
 * Valid batch status transitions.
 * Maps each status to the list of statuses it can transition to.
 */
export const VALID_TRANSITIONS: Record<BatchStatus, BatchStatus[]> = {
  [BatchStatus.UPLOADED]: [BatchStatus.RESOLVING, BatchStatus.CANCELLED],
  [BatchStatus.RESOLVING]: [BatchStatus.ORDERING, BatchStatus.PAUSED, BatchStatus.CANCELLED, BatchStatus.PARTIAL_FAILURE],
  [BatchStatus.ORDERING]: [BatchStatus.QUEUED, BatchStatus.PAUSED, BatchStatus.CANCELLED, BatchStatus.PARTIAL_FAILURE],
  [BatchStatus.QUEUED]: [BatchStatus.DISPATCHING, BatchStatus.PAUSED, BatchStatus.CANCELLED],
  [BatchStatus.DISPATCHING]: [BatchStatus.COMPLETE, BatchStatus.PARTIAL_FAILURE, BatchStatus.PAUSED, BatchStatus.CANCELLED],
  [BatchStatus.COMPLETE]: [],
  [BatchStatus.PARTIAL_FAILURE]: [BatchStatus.RESOLVING, BatchStatus.ORDERING, BatchStatus.DISPATCHING, BatchStatus.CANCELLED],
  [BatchStatus.PAUSED]: [BatchStatus.RESOLVING, BatchStatus.ORDERING, BatchStatus.QUEUED, BatchStatus.DISPATCHING, BatchStatus.CANCELLED],
  [BatchStatus.CANCELLED]: [],
};

export const CONFIDENCE_THRESHOLDS = {
  AUTO_MERGE: 90,
  FLAG_DUPLICATE: 70,
} as const;

export const QUEUE_NAMES = {
  SPECIMEN_ORDERS: 'SPECIMEN_ORDERS',
  SPECIMEN_WHATSAPP: 'SPECIMEN_WHATSAPP',
  SPECIMEN_EMAIL: 'SPECIMEN_EMAIL',
} as const;

export const MAX_FILE_SIZE_MB = 10;

export const LINK_EXPIRY_DAYS = 90;

export const RAW_TEACHER_TTL_DAYS = 90;

export const AGGREGATION_TTL_DAYS = 7;
