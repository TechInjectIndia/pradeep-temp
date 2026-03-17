// ---- Enums ----

export type BatchStatus =
  | "PENDING"
  | "RESOLVING"
  | "CREATING_ORDERS"
  | "AGGREGATING"
  | "DISPATCHING"
  | "PAUSED"
  | "COMPLETE"
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
  messagesSentToday: number;
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
