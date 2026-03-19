// ---- Enums ----

export type BatchStatus =
  | "PENDING"
  | "VALIDATING"
  | "UPLOADED"
  | "RESOLVING"
  | "ORDERING"
  | "CREATING_ORDERS"
  | "AGGREGATING"
  | "MESSAGING"
  | "DISPATCHING"
  | "PAUSED"
  | "COMPLETE"
  | "PARTIAL_FAILURE"
  | "CANCELLED"
  | "FAILED";

export type BatchStage =
  | "RESOLUTION"
  | "ORDERS"
  | "AGGREGATION"
  | "MESSAGES";

export type DeliveryStatus =
  | "PENDING"
  | "SENT"
  | "DELIVERED"
  | "READ"
  | "FAILED";

export type DuplicateResolution =
  | "PENDING"
  | "MERGED"
  | "KEPT_SEPARATE";

export type MessageChannel = "WHATSAPP" | "SMS" | "EMAIL";

// ---- Dashboard ----

export interface DashboardStats {
  totalTeachers: number;
  totalMessagesSent: number;
  activeBatches: number;
  queueSize: number;
  dlqSize: number;
}

// ---- Batch ----

export interface Batch {
  batchId: string;
  status: BatchStatus;
  teacherCount: number;
  orderCount: number;
  messageCount: number;
  errorCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface BatchDetail extends Batch {
  stages: StageProgress[];
  deliveryStatus: DeliveryBreakdown;
  statusHistory: StatusHistoryEntry[];
}

export interface StageProgress {
  stage: BatchStage;
  total: number;
  completed: number;
  failed: number;
}

export interface DeliveryBreakdown {
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  pending: number;
}

export interface StatusHistoryEntry {
  status: BatchStatus;
  timestamp: string;
  reason?: string;
}

// ---- Errors ----

export interface BatchLogEntry {
  id: string;
  batchId: string;
  step: string;
  message: string;
  detail?: string;
  metadata?: Record<string, unknown>;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  channel?: "whatsapp" | "email";
  messageBody?: string;
  templateParams?: Record<string, string>;
  subject?: string;
  timestamp: string;
}

export interface BatchError {
  id: string;
  batchId: string;
  stage: BatchStage;
  teacherName: string;
  teacherPhone: string;
  errorType: string;
  message: string;
  retryable: boolean;
  createdAt: string;
}

// ---- Teacher ----

export interface Teacher {
  id: string;
  name: string;
  phone: string;
  email: string;
  /** All phone numbers (last = primary for display) */
  phones?: string[];
  /** All email addresses (last = primary for display) */
  emails?: string[];
  school: string;
  city: string;
  createdAt: string;
}

// ---- Duplicates ----

export interface DuplicateRecord {
  id: string;
  batchId: string;
  incomingRecord: TeacherRecord;
  existingRecord: TeacherRecord;
  confidenceScore: number;
  matchReasons: string[];
  resolution: DuplicateResolution;
  createdAt: string;
}

export interface TeacherRecord {
  name: string;
  phone: string;
  email: string;
  school: string;
  city: string;
}

// ---- DLQ ----

export interface DLQEntry {
  id: string;
  batchId: string;
  teacherPhone: string;
  teacherName: string;
  channel: MessageChannel;
  attempts: number;
  lastError: string;
  retryable: boolean;
  status: "PENDING" | "RETRYING" | "RESOLVED" | "ABANDONED";
  createdAt: string;
  lastAttemptAt: string;
}

// ---- Upload ----

export interface UploadRow {
  name: string;
  phone: string;
  email: string;
  school: string;
  books: string;
}

export type ChannelChoice = "both" | "whatsapp" | "email" | "none";

export interface ReviewedRow extends UploadRow {
  /** Selected phone when multiple exist (after merge) */
  phoneSelected?: string;
  /** Selected email when multiple exist (after merge) */
  emailSelected?: string;
  /** Channel preference: both (default), whatsapp only, email only, none */
  channels: ChannelChoice;
  /** When set, teacher already exists in DB (exact match) — skip resolution, use this ID */
  existingTeacherId?: string;
}

// ---- Pagination ----

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface BatchListParams extends PaginationParams {
  status?: BatchStatus;
}

export interface BatchErrorParams extends PaginationParams {
  stage?: BatchStage;
  retryable?: boolean;
}

export interface TeacherListParams extends PaginationParams {
  search?: string;
}

export interface DuplicateListParams extends PaginationParams {
  batchId?: string;
  resolution?: DuplicateResolution;
}

export interface DLQListParams extends PaginationParams {
  batchId?: string;
  channel?: MessageChannel;
  retryableOnly?: boolean;
}

// ---- Message Logs ----

export interface MessageSendLogEntry {
  id: string;
  teacherPhone?: string;
  teacherEmail?: string;
  teacherName?: string;
  teacherMasterId?: string;
  batchId: string;
  channel: "whatsapp" | "email";
  commLogId: string;
  attemptNumber: number;
  sentAt: string;
  status: "sent" | "delivered" | "failed";
  externalMessageId?: string;
  error?: string;
  templateName?: string;
  linkCount?: number;
  messageBody?: string;
  templateParams?: Record<string, string>;
  subject?: string;
}

export interface ContactSummary {
  contact: string;
  channel: "whatsapp" | "email";
  count: number;
  batches: string[];
  teacherNames: string[];
  lastSentAt: string;
  messageBody?: string;
}

export interface MessageLogsResponse {
  data: MessageSendLogEntry[];
  total: number;
  summary?: {
    byPhone: ContactSummary[];
    byEmail: ContactSummary[];
  };
}

// ---- Specimen / Links ----

export interface UploadedTeacher {
  teacherId: string;
  name: string;
  phone: string;
  email: string;
  school: string;
  books: string;
}

/** Payload: teacherId -> { productId -> quantity } */
export interface GenerateLinksRequest {
  batchId: string;
  teacherProducts: Record<string, Record<string, number>>;
}

/** Response: teacherId -> { productId -> [url, ...] } */
export interface GenerateLinksResponse {
  batchId: string;
  links: Record<string, Record<string, string[]>>;
  expiresAt: string;
  savedTo: string;
  savedDocId: string;
}
