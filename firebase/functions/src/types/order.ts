// ---------------------------------------------------------------------------
// Order — Payload, Document, and Response types
// ---------------------------------------------------------------------------

/**
 * Cloud Task payload enqueued for the orderCreationWorker (legacy – kept for
 * backward compatibility with any in-flight tasks).
 */
export interface OrderTaskPayload {
  teacherRecordId: string;
  batchId: string;
}

// ---------------------------------------------------------------------------
// External Order API  (POST /orders)
// ---------------------------------------------------------------------------

/**
 * Payload sent to the external Order API to create specimen orders for a batch.
 *
 * teachers:  teacherRecordId → productId[]
 *
 * productId is the URL-safe slug of the book title
 * (e.g. "Mathematics Class 10" → "mathematics-class-10").
 *
 * @example
 * {
 *   "batchId": "abc123",
 *   "teachers": {
 *     "teacherRec001": ["mathematics-class-10", "science-class-9"],
 *     "teacherRec002": ["mathematics-class-10"]
 *   }
 * }
 */
export interface ExternalOrderPayload {
  batchId: string;
  /** teacherRecordId → productId[] */
  teachers: Record<string, string[]>;
}

/**
 * Response from the external Order API after creating orders.
 *
 * One specimen access link per teacher × product pair.
 *
 * @example
 * {
 *   "batchId": "abc123",
 *   "teachers": {
 *     "teacherRec001": {
 *       "mathematics-class-10": "https://…/view/abc123/teacherRec001/mathematics-class-10",
 *       "science-class-9":      "https://…/view/abc123/teacherRec001/science-class-9"
 *     },
 *     "teacherRec002": {
 *       "mathematics-class-10": "https://…/view/abc123/teacherRec002/mathematics-class-10"
 *     }
 *   }
 * }
 */
export interface ExternalOrderResponse {
  batchId: string;
  /** teacherRecordId → { productId → link } */
  teachers: Record<string, Record<string, string>>;
}

/**
 * A single book entry inside an order.
 */
export interface OrderBook {
  /** Original book title from the uploaded CSV (e.g. "Mathematics Class 10") */
  title: string;
  /** URL-safe slug derived from the title (e.g. "mathematics-class-10") */
  productId: string;
  /** Full specimen access URL sent to the teacher */
  specimenUrl: string;
  /** ISO date string — when this link expires */
  expiresAt: string;
}

/**
 * The full order document stored in the `orders` Firestore collection.
 *
 * Design principles:
 *  - Denormalized: teacher contact details are stored on the order itself
 *    so the messaging pipeline does not need to join raw-teacher records.
 *  - Deterministic ID: `${teacherRecordId}_${batchId}` ensures idempotency
 *    across retries without needing a separate uniqueness check.
 *  - One order per teacher per batch — all books in one document.
 */
export interface OrderDocument {
  /** Deterministic ID: `${teacherRecordId}_${batchId}` */
  orderId: string;
  batchId: string;

  // Teacher references
  teacherRecordId: string;   // raw teacher record (teachers_raw)
  teacherMasterId: string;   // master teacher record (teachers_master)

  // Denormalized teacher contact — stored so messaging needs no extra fetch
  teacherName: string;
  teacherPhone: string;       // normalized digits only, no country code symbols
  teacherEmail: string;
  school: string;
  city: string;

  // Books
  books: OrderBook[];
  totalBooks: number;

  // Channel preferences (copied from teachers_raw)
  sendWhatsApp: boolean;
  sendEmail: boolean;

  // Lifecycle
  status: 'created' | 'sent' | 'expired';
  expiresAt: string;          // ISO string — same for all books in this order
}

// ---------------------------------------------------------------------------
// API response types
// ---------------------------------------------------------------------------

/**
 * Response from POST /specimenCreateOrders
 * Returned once the external Order API call completes and all orders + links
 * have been persisted to Firestore.
 */
export interface CreateOrdersResponse {
  batchId: string;
  /** Number of orders successfully created (or skipped as duplicates) */
  ordersCreated: number;
  /** Current batch status at time of response */
  batchStatus: string;
  totalTeachers: number;
  resolvedTeachers: number;
  skippedTeachers: number;
  message: string;
}

/**
 * Response from the orderCreationWorker for a single order.
 */
export interface SingleOrderResult {
  orderId: string;
  teacherRecordId: string;
  batchId: string;
  totalBooks: number;
  books: OrderBook[];
  /** 'created' if new, 'skipped' if order already existed (idempotent) */
  outcome: 'created' | 'skipped';
}
