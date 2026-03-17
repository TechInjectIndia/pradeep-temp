import {
  BatchStatus,
  ResolutionStatus,
  CommLogStatus,
  DeliveryStatus,
  DuplicateResolution,
  BatchErrorStage,
  ErrorType,
  ErrorResolution,
  DLQErrorType,
  DLQResolution,
  Channel,
} from './enums';

/** Alias for Firestore Timestamp since this is a shared package */
export type FirestoreTimestamp = any;

// ---------------------------------------------------------------------------
// Firestore Document Interfaces
// ---------------------------------------------------------------------------

export interface PhoneLookup {
  teacherId: string;
  addedAt: FirestoreTimestamp;
}

export interface EmailLookup {
  teacherId: string;
  addedAt: FirestoreTimestamp;
}

export interface TeacherMaster {
  teacherId: string;
  name: string;
  primaryPhone: string;
  primaryEmail: string;
  phones: string[];
  emails: string[];
  schoolIds: string[];
  city: string;
  phoneticNameKey: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface TeacherRaw {
  teacherRecordId: string;
  name: string;
  phone: string;
  email: string;
  school: string;
  batchId: string;
  resolvedTeacherId: string | null;
  resolutionStatus: ResolutionStatus;
  resolvedAt: FirestoreTimestamp | null;
  failureReason: string | null;
  ttlExpiry: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
}

export interface BatchStats {
  totalTeachers: number;
  resolvedTeachers: number;
  failedResolutions: number;
  totalOrders: number;
  createdOrders: number;
  failedOrders: number;
  totalAggregations: number;
  completedAggregations: number;
  totalMessages: number;
  sentMessages: number;
  deliveredMessages: number;
  failedMessages: number;
  dlqMessages: number;
}

export interface StatusHistoryEntry {
  status: BatchStatus;
  timestamp: FirestoreTimestamp;
  trigger: string;
}

export interface SpecimenBatch {
  batchId: string;
  createdBy: string;
  status: BatchStatus;
  previousStatus: BatchStatus;
  statusChangedAt: FirestoreTimestamp;
  statusHistory: StatusHistoryEntry[];
  pausedAt: FirestoreTimestamp;
  cancelledAt: FirestoreTimestamp;
  cancelReason: string;
  stats: BatchStats;
  createdAt: FirestoreTimestamp;
}

export interface Order {
  orderId: string;
  orderType: string;
  teacherRecordId: string;
  teacherPhone: string;
  productId: string;
  paymentStatus: string;
  batchId: string;
  isFulfillmentComplete: boolean;
  specimenLinkUrl: string;
  specimenQrUrl: string;
  linkExpiresAt: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export interface AggregationLink {
  productId: string;
  productName: string;
  signedUrl: string;
  qrUrl: string;
}

export interface TempAggregation {
  aggregationKey: string;
  teacherPhone: string;
  batchId: string;
  expectedOrderCount: number;
  receivedCount: number;
  links: AggregationLink[];
  isComplete: boolean;
  completedAt: FirestoreTimestamp;
  lastUpdatedAt: FirestoreTimestamp;
  ttlExpiry: FirestoreTimestamp;
}

export interface CommLog {
  messageId: string;
  teacherPhone: string;
  batchId: string;
  channel: Channel;
  messageHash: string;
  payload: Record<string, any>;
  status: CommLogStatus;
  externalMessageId: string;
  cloudTaskId: string;
  attemptCount: number;
  firstAttemptAt: FirestoreTimestamp;
  lastAttemptAt: FirestoreTimestamp;
  lastError: string;
  movedToDlqAt: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
}

export interface CommunicationProduct {
  productId: string;
  productName: string;
}

export interface TeacherCommunication {
  communicationId: string;
  teacherId: string;
  teacherPhone: string;
  batchId: string;
  channel: Channel;
  products: CommunicationProduct[];
  messagePayload: Record<string, any>;
  externalMessageId: string;
  sentAt: FirestoreTimestamp;
  deliveryStatus: DeliveryStatus;
  deliveryUpdatedAt: FirestoreTimestamp;
  deliveryError: string;
  status: string;
}

export interface PossibleDuplicate {
  duplicateId: string;
  teacherRecordId: string;
  candidateTeacherId: string;
  batchId: string;
  confidenceScore: number;
  matchReasons: string[];
  resolution: DuplicateResolution;
  reviewedBy: string;
  reviewedAt: FirestoreTimestamp;
  createdAt: FirestoreTimestamp;
}

export interface BatchError {
  errorId: string;
  batchId: string;
  stage: BatchErrorStage;
  teacherRecordId: string;
  teacherPhone: string;
  orderId: string;
  errorType: ErrorType;
  errorMessage: string;
  rawPayload: Record<string, any>;
  stackTrace: string;
  isRetryable: boolean;
  retryCount: number;
  retriedAt: FirestoreTimestamp;
  resolvedAt: FirestoreTimestamp;
  resolution: ErrorResolution | null;
  createdAt: FirestoreTimestamp;
}

export interface FailedMessage {
  failedMessageId: string;
  originalMessageId: string;
  batchId: string;
  teacherPhone: string;
  channel: Channel;
  messageHash: string;
  payload: Record<string, any>;
  totalAttempts: number;
  lastError: string;
  lastErrorType: DLQErrorType;
  isRetryable: boolean;
  retryAfter: FirestoreTimestamp;
  manuallyRetried: boolean;
  manuallyRetriedAt: FirestoreTimestamp;
  manuallyRetriedBy: string;
  resolvedAt: FirestoreTimestamp;
  resolution: DLQResolution | null;
  createdAt: FirestoreTimestamp;
}
