
# Virtual Specimen Distribution System (VSDS)
Comprehensive Product Requirements + Architecture Specification

**Version:** 3.0 (Revised)
**Generated:** 2026-03-11T14:09:47.456791
**Revised:** 2026-03-11 — Schema hardening, batch state machine, DLQ design, architecture review

---

# 1. PRODUCT OVERVIEW

VSDS (Virtual Specimen Distribution System) is a distribution platform designed to send digital LMS book specimens to teachers at scale.
The system integrates with the existing digital order infrastructure and automates:

- teacher ingestion
- identity resolution
- specimen order creation
- QR generation reuse
- link aggregation
- WhatsApp distribution
- email distribution
- communication history

Target capability:

- 20k+ teachers per batch
- 100k+ teachers stored
- 36k+ messages per hour

---

# 2. TECHNOLOGY STACK

## Frontend
- Next.js
- TypeScript
- TailwindCSS
- React Query
- Zod validation

## Backend
- Firebase Cloud Functions (v2 — Cloud Run based, required for concurrency)
- Firestore
- Firebase Auth

## Search Layer (NEW)
- Algolia or Typesense — for fuzzy identity resolution (name + school matching)

## Messaging
- WATI WhatsApp API
- Resend Email API

## Queue
- Google Cloud Tasks (separate queues per channel)

## Hosting
- Frontend → Vercel
- Backend → Firebase
- Database → Firestore

---

# 3. HIGH LEVEL ARCHITECTURE (HLD)

```
Admin Dashboard (Next.js / Vercel)
        |
        v
VSDS API (Firebase Functions v2)
        |
        +-----------------------------+
        |                             |
Teacher Identity Engine          Specimen Order Engine
        |                             |
        +--- Phone/Email Lookup       +--- Backpressured via Cloud Tasks
        |    (Firestore O(1) gets)    |    (not burst-fired)
        |                             |
        +--- Fuzzy Match              v
        |    (Algolia/Typesense)  Existing LMS Orders System
        |                             |
        v                             v
Firestore DB                   QR + Signed URLs
                                      |
                                      v
                                Aggregation Layer
                                (Firestore triggers on completion)
                                      |
                                      v
                          +---------------------+
                          |                     |
                   Cloud Tasks Queue      Cloud Tasks Queue
                   (specimen-whatsapp)    (specimen-email)
                          |                     |
                          v                     v
                    WhatsApp (WATI)        Email (Resend)
                          |                     |
                          +----------+----------+
                                     |
                                     v
                              Delivery Webhooks
                              (WATI + Resend callbacks)
                                     |
                                     v
                              teacher_communications
                              (delivery status tracking)
                                     |
                                     v
                              Teacher LMS Access
```

**Key changes from v2:**
1. Firebase Functions v2 explicitly required (concurrency support)
2. Identity resolution split into O(1) lookups + fuzzy search layer
3. Order creation backpressured through Cloud Tasks (not burst-fired)
4. Separate queues per messaging channel (different rate limits and failure modes)
5. Delivery webhook loop added for status tracking
6. Aggregation uses Firestore triggers on completion signal (not polling)

---

# 4. SEQUENCE FLOW

## Specimen Distribution

```
Admin Upload Excel
      |
      v
Parse + Validate (Zod schema)
      |
      v
Create Batch (status: UPLOADED)
      |
      v
Teacher Resolution Engine ──────── Batch → RESOLVING
      |
      +── Phone Lookup (O(1) doc get from phone_lookup/)
      +── Email Lookup (O(1) doc get from email_lookup/)
      +── Fuzzy Match (Algolia: name + school, if no exact match)
      +── Confidence Scoring
      |       >90  → auto merge
      |       70-90 → flag duplicate (non-blocking)
      |       <70  → create new teacher
      |
      v
Create Raw Teacher Records
      |
      v
Batch → ORDERING
      |
      v
Enqueue Order Creation Tasks ────── (backpressured, not burst)
      |
      v
Cloud Tasks → Order Creation Worker
      |
      v
Existing Digital Order System
      |
      v
Generate QR + Access Links
      |
      v
Write to temp_aggregation ────────── (arrayUnion, increment receivedCount)
      |
      v
Firestore Trigger: isComplete == true
      |
      v
Batch → QUEUED
      |
      v
Enqueue Messaging Tasks
      |
      v
Cloud Tasks → Messaging Worker
      |
      +── Check messageHash (idempotency)
      +── Send via WATI or Resend
      +── Write to comm_log (with externalMessageId)
      +── Update teacher_communications
      |
      v
Batch → DISPATCHING
      |
      v
All messages processed
      |
      v
Batch → COMPLETE / PARTIAL_FAILURE
      |
      v
Teacher Opens LMS Reader
```

---

# 5. LOW LEVEL DESIGN (LLD)

## Core Services

```
TeacherService
SpecimenService
BatchService
BatchStateMachineService  ← NEW
MessagingService
DuplicateService
AggregationService
DLQService                ← NEW
ErrorTrackingService      ← NEW
```

## Repository Layer

```
TeacherRepository
PhoneLookupRepository     ← NEW
EmailLookupRepository     ← NEW
BatchRepository
OrderRepository
CommunicationRepository
DuplicateRepository
CommLogRepository         ← NEW (renamed from comm_queue)
BatchErrorRepository      ← NEW
```

## Infrastructure

```
FirestoreAdapter
CloudTasksAdapter
ResendAdapter
WATIAdapter
AlgoliaAdapter            ← NEW (or TypesenseAdapter)
DeliveryWebhookHandler    ← NEW
```

---

# 6. SOLID BACKEND ARCHITECTURE

```
src/
  modules/
    teachers/
    specimens/
    batches/
    duplicates/
    messaging/
    dlq/                    ← NEW

  services/
    TeacherService.ts
    SpecimenService.ts
    MessagingService.ts
    BatchStateMachine.ts    ← NEW
    DLQService.ts           ← NEW

  repositories/
    TeacherRepository.ts
    PhoneLookupRepository.ts   ← NEW
    EmailLookupRepository.ts   ← NEW
    BatchRepository.ts
    OrderRepository.ts
    CommLogRepository.ts       ← RENAMED
    BatchErrorRepository.ts    ← NEW

  interfaces/
    ITeacherRepository.ts
    IMessageService.ts
    IBatchStateMachine.ts      ← NEW

  controllers/
    SpecimenController.ts
    WebhookController.ts       ← NEW (WATI + Resend delivery callbacks)
    DLQController.ts           ← NEW

  infrastructure/
    firestore/
    cloudtasks/
    resend/
    wati/
    algolia/                   ← NEW

  triggers/
    onAggregationComplete.ts   ← NEW (Firestore trigger)
    onBatchStateChange.ts      ← NEW

  utils/
    identityMatching.ts
    messageHasher.ts           ← NEW
    phoneNormalizer.ts         ← NEW
```

---

# 7. FIRESTORE DATABASE SCHEMA

## 7.1 phone_lookup (NEW)

O(1) identity resolution by phone number. Replaces ARRAY_CONTAINS queries on teachers_master.

```
phone_lookup/{normalizedPhone}
  teacherId: string
  addedAt: timestamp
```

Document ID is the normalized phone number (E.164 format, e.g., "+919876543210").
One document per phone → one Firestore get per lookup (no query needed).

**Write rules:**
- Created when a new teacher is added to teachers_master
- Created when a teacher merges and gains a new phone
- Deleted if a phone is removed from a teacher

---

## 7.2 email_lookup (NEW)

O(1) identity resolution by email address.

```
email_lookup/{normalizedEmail}
  teacherId: string
  addedAt: timestamp
```

Document ID is the lowercased, trimmed email address.
Same write rules as phone_lookup.

---

## 7.3 teachers_master (REVISED)

```
teachers_master/{teacherId}
  teacherId: string
  name: string
  primaryPhone: string          ← NEW (denormalized for display)
  primaryEmail: string          ← NEW (denormalized for display)
  phones: string[]              ← RETAINED for historical record
  emails: string[]              ← RETAINED for historical record
  schoolIds: string[]           ← CHANGED from schools[] (reference school_lookup if needed)
  city: string
  phoneticNameKey: string       ← NEW (Soundex/Metaphone for fuzzy fallback)
  createdAt: timestamp
  updatedAt: timestamp
```

**Indexes:**

```
phoneticNameKey + city          ← NEW (for fuzzy name matching fallback)
updatedAt DESC                  ← NEW (for admin CRM views)
```

**NOTE:** phones[] and emails[] arrays are retained for display and audit, but are NOT the primary lookup mechanism. All identity resolution goes through phone_lookup/ and email_lookup/ first.

---

## 7.4 teachers_raw (REVISED)

```
teachers_raw/{teacherRecordId}
  teacherRecordId: string
  name: string
  phone: string
  email: string
  school: string
  batchId: string
  resolvedTeacherId: string | null
  resolutionStatus: string      ← NEW: 'pending' | 'resolved' | 'failed'
  resolvedAt: timestamp | null  ← NEW
  failureReason: string | null  ← NEW
  ttlExpiry: timestamp          ← NEW: auto-delete after 90 days (Firestore TTL policy)
  createdAt: timestamp
```

**Indexes:**

```
batchId + resolutionStatus
ttlExpiry                       ← Firestore TTL policy target
```

**Lifecycle:**
- Created during batch upload
- Updated to 'resolved' or 'failed' during identity resolution
- Auto-deleted 90 days after creation via Firestore TTL policy
- For audit trail beyond 90 days, export to BigQuery before TTL kicks in

---

## 7.5 specimen_batches (REVISED — State Machine)

```
specimen_batches/{batchId}
  batchId: string
  createdBy: string
  status: string                ← REVISED: now uses state machine (see Section 16)
  previousStatus: string        ← NEW: for transition audit
  statusChangedAt: timestamp    ← NEW
  statusHistory: array          ← NEW: [{status, timestamp, trigger}]
  pausedAt: timestamp | null    ← NEW
  cancelledAt: timestamp | null ← NEW
  cancelReason: string | null   ← NEW
  stats: object                 ← REVISED (see below)
  createdAt: timestamp
```

**stats object (REVISED):**

```
stats: {
  totalTeachers: number
  resolvedTeachers: number
  failedResolutions: number
  totalOrders: number
  createdOrders: number
  failedOrders: number
  totalAggregations: number
  completedAggregations: number
  totalMessages: number
  sentMessages: number
  deliveredMessages: number
  failedMessages: number
  dlqMessages: number            ← NEW: count in dead letter queue
}
```

**Indexes:**

```
createdBy + status
status + createdAt DESC
```

---

## 7.6 orders (EXISTING — with recommended additions)

```
orders/{orderId}
  orderId: string
  orderType: string              (ecommerce | specimen)
  teacherRecordId: string
  teacherPhone: string
  productId: string
  paymentStatus: string
  batchId: string | null         (null for ecommerce)
  isFulfillmentComplete: boolean
  specimenLinkUrl: string | null ← NEW: the generated signed URL
  specimenQrUrl: string | null   ← NEW: the QR image URL
  linkExpiresAt: timestamp | null ← NEW: signed URL expiry
  createdAt: timestamp           ← RECOMMENDED addition
  updatedAt: timestamp           ← RECOMMENDED addition
```

**Indexes (ADD composite indexes for specimen queries):**

```
orderType + batchId
orderType + teacherPhone
orderType + isFulfillmentComplete + batchId
```

**WARNING:** Every query in the existing e-commerce system that does NOT already filter by orderType will now return specimen orders in results. Audit all existing queries and add `where('orderType', '==', 'ecommerce')` filters before deploying VSDS.

---

## 7.7 temp_aggregation (REVISED — completion signal)

```
temp_aggregation/{aggregationKey}
  aggregationKey: string         (format: {batchId}_{normalizedPhone})
  teacherPhone: string
  batchId: string
  expectedOrderCount: number     ← NEW: set when orders are created for this teacher
  receivedCount: number          ← NEW: incremented atomically with each link added
  links: array                   ← CHANGED: use arrayUnion for writes (no transactions needed)
    [{
      productId: string
      productName: string
      signedUrl: string
      qrUrl: string
    }]
  isComplete: boolean            ← NEW: set to true when receivedCount == expectedOrderCount
  completedAt: timestamp | null  ← NEW
  lastUpdatedAt: timestamp
  ttlExpiry: timestamp           ← NEW: auto-delete 7 days after batch completes
```

**Indexes:**

```
batchId + isComplete
ttlExpiry                        ← Firestore TTL policy target
```

**Write pattern:**
Each order completion writes to this document using:
```
FieldValue.arrayUnion(linkObject)   // atomic, no transaction
FieldValue.increment(1)             // atomic increment of receivedCount
```

Then a conditional check: if `receivedCount == expectedOrderCount`, set `isComplete = true` and `completedAt`. This can be done in a Firestore trigger (`onUpdate`) or in the order completion Cloud Function.

**Firestore trigger (onUpdate):**
When `isComplete` flips to `true`, the trigger enqueues the messaging task for this teacher. No polling required.

---

## 7.8 comm_log (RENAMED from comm_queue)

This collection is a log of all messaging attempts. Cloud Tasks is the actual queue — this collection does NOT drive scheduling.

```
comm_log/{messageId}
  messageId: string
  teacherPhone: string
  batchId: string
  channel: string               ← NEW: 'whatsapp' | 'email'
  messageHash: string           ← hash(teacherPhone + batchId + sorted(productIds))
  payload: object               ← the message content sent
  status: string                ← 'queued' | 'sent' | 'failed' | 'dlq'
  externalMessageId: string | null ← NEW: WATI message ID or Resend message ID
  cloudTaskId: string | null
  attemptCount: number          ← NEW
  firstAttemptAt: timestamp     ← NEW
  lastAttemptAt: timestamp | null ← NEW
  lastError: string | null
  movedToDlqAt: timestamp | null ← NEW
  createdAt: timestamp
```

**Indexes:**

```
batchId + status
messageHash                      ← for idempotency checks before send
status + batchId
```

**Idempotency protocol:**
1. Before enqueuing a Cloud Task, check if `messageHash` already exists with status 'sent'. If yes, skip.
2. Before sending via WATI/Resend, check again (handles retry scenarios).
3. After successful send, write `externalMessageId` and set status to 'sent'.
4. On retry: if `externalMessageId` is already set, the message was sent — mark as 'sent' and exit.

---

## 7.9 teacher_communications (REVISED — delivery tracking)

```
teacher_communications/{communicationId}
  communicationId: string
  teacherId: string
  teacherPhone: string          ← NEW: denormalized for direct lookup
  batchId: string
  channel: string               ← 'whatsapp' | 'email'
  products: array
    [{
      productId: string
      productName: string
    }]
  messagePayload: object        ← NEW: the actual content sent (template + data)
  externalMessageId: string     ← NEW: WATI or Resend message ID
  sentAt: timestamp
  deliveryStatus: string        ← NEW: 'sent' | 'delivered' | 'read' | 'failed'
  deliveryUpdatedAt: timestamp | null ← NEW
  deliveryError: string | null  ← NEW
  status: string                ← RETAINED for backward compat
```

**Indexes:**

```
teacherId + batchId
batchId + deliveryStatus
channel + deliveryStatus
```

**Delivery webhook flow:**
WATI and Resend both provide webhook callbacks for message status updates. The `WebhookController` receives these callbacks and updates `deliveryStatus` and `deliveryUpdatedAt` by looking up the record via `externalMessageId`.

---

## 7.10 possible_duplicates (REVISED)

```
possible_duplicates/{duplicateId}
  duplicateId: string
  teacherRecordId: string        ← the incoming raw record
  candidateTeacherId: string     ← the existing master record
  batchId: string                ← NEW: which batch surfaced this
  confidenceScore: number
  matchReasons: string[]         ← NEW: ['phone_exact', 'name_similarity:85', 'school_exact']
  resolution: string             ← CHANGED: 'pending' | 'merged' | 'kept_separate'
  reviewedBy: string | null      ← NEW
  reviewedAt: timestamp | null   ← NEW
  createdAt: timestamp           ← NEW
```

**Indexes:**

```
batchId + resolution
resolution + createdAt DESC
confidenceScore DESC
```

---

## 7.11 batch_errors (NEW)

Structured error tracking per batch. Replaces "dig through Cloud Function logs."

```
batch_errors/{errorId}
  errorId: string
  batchId: string
  stage: string                  ← 'resolution' | 'order_creation' | 'aggregation' | 'messaging'
  teacherRecordId: string | null
  teacherPhone: string | null
  orderId: string | null
  errorType: string              ← 'VALIDATION' | 'API_FAILURE' | 'TIMEOUT' | 'RATE_LIMIT' | 'UNKNOWN'
  errorMessage: string
  rawPayload: object | null      ← the input that caused the failure
  stackTrace: string | null
  isRetryable: boolean
  retryCount: number             ← NEW: how many times this has been retried
  retriedAt: timestamp | null
  resolvedAt: timestamp | null
  resolution: string | null      ← 'retried_success' | 'manually_resolved' | 'skipped'
  createdAt: timestamp
```

**Indexes:**

```
batchId + stage
batchId + isRetryable
stage + errorType
createdAt DESC
```

---

## 7.12 failed_messages (NEW — Dead Letter Queue)

Messages that exhausted all Cloud Task retries. See Section 17 for DLQ design.

```
failed_messages/{failedMessageId}
  failedMessageId: string
  originalMessageId: string      ← reference to comm_log document
  batchId: string
  teacherPhone: string
  channel: string                ← 'whatsapp' | 'email'
  messageHash: string
  payload: object
  totalAttempts: number
  lastError: string
  lastErrorType: string          ← 'RATE_LIMIT' | 'INVALID_PHONE' | 'API_DOWN' | 'TIMEOUT' | 'UNKNOWN'
  isRetryable: boolean           ← based on error classification
  retryAfter: timestamp | null   ← for rate limit errors, when to retry
  manuallyRetried: boolean
  manuallyRetriedAt: timestamp | null
  manuallyRetriedBy: string | null
  resolvedAt: timestamp | null
  resolution: string | null      ← 'retried_success' | 'skipped' | 'phone_invalid'
  createdAt: timestamp
```

**Indexes:**

```
batchId + isRetryable
channel + lastErrorType
isRetryable + createdAt
batchId + resolution
```

---

## Collection Map (Summary)

```
phone_lookup/{normalizedPhone}                ← NEW: O(1) phone resolution
email_lookup/{normalizedEmail}                ← NEW: O(1) email resolution
teachers_master/{teacherId}                   ← REVISED: + phoneticNameKey, primaryPhone/Email
teachers_raw/{teacherRecordId}                ← REVISED: + resolutionStatus, TTL
specimen_batches/{batchId}                    ← REVISED: state machine, statusHistory
orders/{orderId}                              ← EXISTING: + composite indexes, specimen fields
temp_aggregation/{aggregationKey}             ← REVISED: + completion signal, TTL
comm_log/{messageId}                          ← RENAMED: log-only, Cloud Tasks is the queue
teacher_communications/{communicationId}      ← REVISED: + delivery tracking, payload
possible_duplicates/{duplicateId}             ← REVISED: + batchId, matchReasons, reviewedBy
batch_errors/{errorId}                        ← NEW: structured error tracking
failed_messages/{failedMessageId}             ← NEW: dead letter queue
```

---

# 8. IDENTITY RESOLUTION LOGIC

## Resolution Pipeline

**Step 1: Exact phone match (O(1))**
```
GET phone_lookup/{normalizedPhone}
→ if exists: return teacherId (confidence: 100)
```

**Step 2: Exact email match (O(1))**
```
GET email_lookup/{normalizedEmail}
→ if exists: return teacherId (confidence: 95)
```

**Step 3: Fuzzy name + school match (Algolia/Typesense)**
```
SEARCH teachers index: name ~ incomingName AND school ~ incomingSchool AND city == incomingCity
→ returns candidates with relevance scores
```

**Step 4: Confidence scoring on candidates**

| Signal | Weight |
|--------|--------|
| Phone exact match | 100 (auto-resolve in Step 1) |
| Email exact match | 95 (auto-resolve in Step 2) |
| Name similarity (Levenshtein/Jaro-Winkler) | 0-40 |
| School exact match | 30 |
| School similarity | 0-20 |
| City match | 10 |

| Composite Score | Decision |
|----------------|----------|
| >90 | Auto merge |
| 70-90 | Flag duplicate for admin review |
| <70 | Create new teacher |

**Step 5: Side effects**
- New teacher → write to teachers_master + phone_lookup + email_lookup + Algolia index
- Auto merge → update teachers_master arrays + add new lookups if new phone/email
- Flag duplicate → write to possible_duplicates (non-blocking, pipeline continues)

Duplicates are stored for admin review without blocking pipeline.

---

# 9. OPENAPI CONTRACT

```yaml
openapi: 3.0.0
info:
  title: VSDS API
  version: 2.0

paths:

  /specimen/upload:
    post:
      summary: Upload teacher specimen list
      description: Accepts Excel file, creates batch, starts resolution pipeline
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
                  description: Excel file (.xlsx) with columns: name, phone, email, school, city, books
      responses:
        200:
          description: Batch created
          content:
            application/json:
              schema:
                type: object
                properties:
                  batchId:
                    type: string
                  teacherCount:
                    type: integer
                  status:
                    type: string
                    enum: [UPLOADED]
        400:
          description: Validation error (missing columns, invalid phones, etc.)
        413:
          description: File too large (max 10MB)

  /specimen/create-orders:
    post:
      summary: Create specimen orders for a batch
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [batchId]
              properties:
                batchId:
                  type: string
      responses:
        200:
          description: Order creation tasks enqueued
          content:
            application/json:
              schema:
                type: object
                properties:
                  batchId:
                    type: string
                  ordersToCreate:
                    type: integer
                  status:
                    type: string
                    enum: [ORDERING]
        404:
          description: Batch not found
        409:
          description: Batch not in valid state for order creation

  /duplicates:
    get:
      summary: List flagged duplicates
      parameters:
        - name: batchId
          in: query
          schema:
            type: string
        - name: resolution
          in: query
          schema:
            type: string
            enum: [pending, merged, kept_separate]
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
        - name: startAfter
          in: query
          schema:
            type: string
      responses:
        200:
          description: Duplicate list returned

  /duplicates/resolve:
    post:
      summary: Resolve a duplicate teacher pair
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [duplicateId, action]
              properties:
                duplicateId:
                  type: string
                action:
                  type: string
                  enum: [merge, keep_separate]
      responses:
        200:
          description: Duplicate resolved
        404:
          description: Duplicate record not found

  /messages/resend:
    post:
      summary: Resend specimen message to a teacher
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [communicationId]
              properties:
                communicationId:
                  type: string
                channel:
                  type: string
                  enum: [whatsapp, email]
      responses:
        200:
          description: Message queued for resend
        404:
          description: Communication record not found

  /batches:
    get:
      summary: List specimen batches
      parameters:
        - name: status
          in: query
          schema:
            type: string
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
        - name: startAfter
          in: query
          schema:
            type: string
            description: Cursor for pagination (batchId)
      responses:
        200:
          description: Batch list returned

  /batches/{batchId}:
    get:
      summary: Get batch details with stats
      parameters:
        - name: batchId
          in: path
          required: true
          schema:
            type: string
      responses:
        200:
          description: Batch details with stats and status history

  /batches/{batchId}/pause:
    post:
      summary: Pause a running batch
      responses:
        200:
          description: Batch paused
        409:
          description: Batch not in pausable state

  /batches/{batchId}/resume:
    post:
      summary: Resume a paused batch
      responses:
        200:
          description: Batch resumed
        409:
          description: Batch not paused

  /batches/{batchId}/cancel:
    post:
      summary: Cancel a batch (stops further processing)
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                reason:
                  type: string
      responses:
        200:
          description: Batch cancelled

  /batches/{batchId}/errors:
    get:
      summary: List errors for a batch
      parameters:
        - name: stage
          in: query
          schema:
            type: string
            enum: [resolution, order_creation, aggregation, messaging]
        - name: isRetryable
          in: query
          schema:
            type: boolean
      responses:
        200:
          description: Error list returned

  /batches/{batchId}/errors/retry:
    post:
      summary: Retry all retryable errors for a batch stage
      requestBody:
        content:
          application/json:
            schema:
              type: object
              required: [stage]
              properties:
                stage:
                  type: string
                  enum: [resolution, order_creation, aggregation, messaging]
      responses:
        200:
          description: Retry tasks enqueued

  /dlq:
    get:
      summary: List dead letter queue messages
      parameters:
        - name: batchId
          in: query
          schema:
            type: string
        - name: isRetryable
          in: query
          schema:
            type: boolean
        - name: channel
          in: query
          schema:
            type: string
            enum: [whatsapp, email]
      responses:
        200:
          description: DLQ messages returned

  /dlq/retry:
    post:
      summary: Retry messages from dead letter queue
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                failedMessageIds:
                  type: array
                  items:
                    type: string
                retryAll:
                  type: boolean
                  default: false
                batchId:
                  type: string
      responses:
        200:
          description: DLQ messages re-enqueued

  /webhooks/wati:
    post:
      summary: WATI delivery status webhook
      description: Called by WATI when message delivery status changes
      responses:
        200:
          description: Webhook processed

  /webhooks/resend:
    post:
      summary: Resend delivery status webhook
      description: Called by Resend when email delivery status changes
      responses:
        200:
          description: Webhook processed
```

---

# 10. ADMIN DASHBOARD WIREFRAMES

## Dashboard

```
---------------------------------------
 Specimen Distribution Dashboard
---------------------------------------

Teachers: 12,300
Messages Sent Today: 1,200
Active Batches: 3
Queue Size: 18
DLQ Size: 4                    ← NEW

Recent Batches
---------------------------------------
Batch | Teachers | Status | Errors
---------------------------------------
```

---

## Excel Upload

```
---------------------------------------
Upload Teacher List

[ Download Template ]

Drag Excel File

Preview:
Teacher | Phone | Books

Teachers: 540
Orders: 1320

[ Cancel ] [ Start Distribution ]
```

---

## Batch Monitor (REVISED)

```
Batch ID: BATCH_231
Status: DISPATCHING                    ← now shows state machine status
Started: 2026-03-11 14:30 IST

[ Pause ] [ Cancel ]                   ← NEW: batch controls

Stage Progress
---------------------------------------
Resolution:    █████████████████ 100%  (540/540)
  Failed: 3    [ View Errors ]
Orders:        █████████████████ 100%  (1320/1320)
  Failed: 0
Aggregation:   █████████████████ 100%  (540/540)
Messages:      ██████████████    82%   (443/540)
  Failed: 2    [ View Errors ]
  In DLQ: 1    [ View DLQ ]           ← NEW

Delivery Status                        ← NEW
---------------------------------------
Sent: 443
Delivered: 410
Read: 285
Failed: 2

Status History                         ← NEW
---------------------------------------
14:30  UPLOADED
14:30  RESOLVING
14:32  ORDERING
14:35  QUEUED
14:35  DISPATCHING
```

---

## Duplicate Review

```
Incoming Record
Rahul Kumar Sharma
DAV School
+91 98765 43210

Existing Record
Rahul Sharma
DAV School
+91 98765 43210

Confidence: 82%
Match Reasons: phone_exact, name_similarity:82   ← NEW

Batch: BATCH_231                                  ← NEW

[ Merge ] [ Keep Separate ]
```

---

## Error Viewer (NEW)

```
---------------------------------------
Batch BATCH_231 — Errors
---------------------------------------

Filter: [ All Stages ▼ ] [ Retryable Only ☐ ]

Stage         | Teacher          | Error              | Retryable
---------------------------------------
resolution    | Amit Sen         | INVALID_PHONE      | No
order_creation| Priya Gupta      | API_TIMEOUT        | Yes
messaging     | Rahul Kumar      | WATI_RATE_LIMIT    | Yes

[ Retry All Retryable (2) ]
```

---

## DLQ Viewer (NEW)

```
---------------------------------------
Dead Letter Queue
---------------------------------------

Filter: [ All Batches ▼ ] [ WhatsApp ▼ ] [ Retryable Only ☐ ]

Teacher Phone  | Channel   | Attempts | Last Error       | Retryable
---------------------------------------
+91 98765...   | WhatsApp  | 5        | WATI_RATE_LIMIT  | Yes (after 14:00)
+91 87654...   | Email     | 5        | INVALID_EMAIL    | No

[ Retry Selected ] [ Retry All Retryable ]
```

---

# 11. PROJECT FOLDER SCAFFOLD

```
vsds-platform/

  apps/
    admin-dashboard/
      nextjs-app/

  services/
    api/

  packages/
    ui/
    types/

  firebase/
    functions/
      src/
        controllers/
          SpecimenController.ts
          WebhookController.ts          ← NEW
          DLQController.ts              ← NEW
        services/
          TeacherService.ts
          SpecimenService.ts
          MessagingService.ts
          BatchStateMachine.ts          ← NEW
          DLQService.ts                 ← NEW
        repositories/
          TeacherRepository.ts
          PhoneLookupRepository.ts      ← NEW
          EmailLookupRepository.ts      ← NEW
          BatchRepository.ts
          OrderRepository.ts
          CommLogRepository.ts          ← RENAMED
          BatchErrorRepository.ts       ← NEW
        infrastructure/
          firestore/
          cloudtasks/
          resend/
          wati/
          algolia/                      ← NEW
        triggers/
          onAggregationComplete.ts      ← NEW
          onBatchStateChange.ts         ← NEW
        interfaces/
        utils/

  docs/
    PRD.md
    ARCHITECTURE_REVIEW.md              ← NEW
    STATE_MACHINE.md                    ← NEW
```

Next.js project:

```
app/
  dashboard/
  teachers/
  batches/
  batches/[batchId]/
  batches/[batchId]/errors/             ← NEW
  duplicates/
  queue/
  dlq/                                  ← NEW

components/
  BatchStateIndicator.tsx               ← NEW
  ErrorTable.tsx                        ← NEW
  DLQTable.tsx                          ← NEW
  DeliveryStatusBadge.tsx               ← NEW
hooks/
services/
types/
```

---

# 12. CLOUD TASK QUEUE CONFIG (REVISED)

## Queue: specimen-orders (NEW — backpressured order creation)

```
queue: specimen-orders

maxDispatchesPerSecond: 20
maxConcurrentDispatches: 10

retryConfig:
  maxAttempts: 3
  minBackoff: 10s
  maxBackoff: 60s
```

## Queue: specimen-whatsapp (REVISED — separated from email)

```
queue: specimen-whatsapp

maxDispatchesPerSecond: 8
maxConcurrentDispatches: 15

retryConfig:
  maxAttempts: 5
  minBackoff: 30s
  maxBackoff: 300s
  maxDoublings: 3
```

Estimated throughput:
```
8 messages/sec
480 messages/min
~28.8k messages/hour
```

## Queue: specimen-email (NEW — separate queue, higher throughput)

```
queue: specimen-email

maxDispatchesPerSecond: 15
maxConcurrentDispatches: 25

retryConfig:
  maxAttempts: 5
  minBackoff: 15s
  maxBackoff: 120s
  maxDoublings: 3
```

Estimated throughput:
```
15 messages/sec
900 messages/min
~54k messages/hour
```

**Combined estimated throughput: ~80k messages/hour** (WhatsApp + Email)

**Key design decisions:**
1. Separate queues because WATI and Resend have different rate limits, error modes, and retry characteristics
2. WhatsApp is throttled lower because WATI enforces per-number rate limits (getting banned is catastrophic)
3. Order creation has its own queue to prevent burst-firing 20K calls at the existing order system
4. After `maxAttempts` exhausted → messaging worker writes to `failed_messages` (DLQ) and `batch_errors`

---

# 13. SECURITY MODEL

- Firebase Auth for admin login
- Signed URLs for specimen access
- Token-based LMS auto-login
- 90 day link expiry
- Rate-limited messaging
- Message hash deduplication
- Webhook signature verification for WATI and Resend callbacks (NEW)
- Admin action audit trail via batch statusHistory (NEW)

---

# 14. IMPLEMENTATION ROADMAP

Phase 1 — Core Pipeline
- Teacher ingestion with phone_lookup / email_lookup
- Batch state machine
- Specimen order creation (backpressured via Cloud Tasks)
- Firebase Functions v2 setup

Phase 2 — Messaging + Aggregation
- Aggregation engine with completion signals
- Separate WhatsApp and Email queues
- Messaging workers with idempotency
- DLQ + batch_errors infrastructure

Phase 3 — Admin Operations
- Duplicate resolution UI with match reasons
- Batch monitor with state history
- Error viewer + DLQ viewer
- Retry-from-DLQ admin actions
- Delivery webhook integration (WATI + Resend)

Phase 4 — Intelligence + Scale
- Algolia/Typesense integration for fuzzy identity resolution
- Analytics dashboard
- Campaign segmentation
- Teacher engagement tracking

---

# 15. FUTURE EXTENSIONS

- teacher engagement analytics
- adoption tracking
- territory reporting
- rep attribution
- predictive adoption scoring
- BigQuery export pipeline for historical data (teachers_raw, comm_log archives)
- Multi-tenant support (multiple publishers)

---

# 16. BATCH STATE MACHINE (NEW)

## State Diagram

```
                    UPLOADED
                       |
                       v
          +-----> RESOLVING
          |            |
          |            v
    (resume)      ORDERING ---------> PAUSED
          |            |                 |
          |            v            (cancel from pause)
          |        QUEUED                |
          |            |                 v
          |            v            CANCELLED
          +------- DISPATCHING -------->|
                       |
              +--------+--------+
              |                 |
              v                 v
          COMPLETE      PARTIAL_FAILURE
```

## Valid State Transitions

| From | To | Trigger |
|------|----|---------|
| (new) | UPLOADED | Excel upload accepted |
| UPLOADED | RESOLVING | Admin clicks "Start Distribution" OR auto-start |
| RESOLVING | ORDERING | All teachers resolved (some may have failed) |
| ORDERING | QUEUED | All order creation tasks completed |
| QUEUED | DISPATCHING | Messaging tasks enqueued |
| DISPATCHING | COMPLETE | All messages sent successfully |
| DISPATCHING | PARTIAL_FAILURE | All messages processed, some failed/DLQ'd |
| RESOLVING | PAUSED | Admin clicks "Pause" |
| ORDERING | PAUSED | Admin clicks "Pause" |
| DISPATCHING | PAUSED | Admin clicks "Pause" |
| PAUSED | RESOLVING | Admin clicks "Resume" (returns to stage where paused) |
| PAUSED | ORDERING | Admin clicks "Resume" |
| PAUSED | DISPATCHING | Admin clicks "Resume" |
| PAUSED | CANCELLED | Admin clicks "Cancel" |
| RESOLVING | CANCELLED | Admin clicks "Cancel" |
| ORDERING | CANCELLED | Admin clicks "Cancel" |
| QUEUED | CANCELLED | Admin clicks "Cancel" |
| DISPATCHING | CANCELLED | Admin clicks "Cancel" |

## State Transition Rules

**UPLOADED → RESOLVING**
- Pre-condition: batch has at least 1 raw teacher record
- Action: begin identity resolution pipeline
- Side effect: update stats.totalTeachers

**RESOLVING → ORDERING**
- Pre-condition: all teachers_raw records for this batch have resolutionStatus != 'pending'
- Action: create specimen orders for resolved teachers
- Side effect: update stats.resolvedTeachers, stats.failedResolutions

**ORDERING → QUEUED**
- Pre-condition: all order creation Cloud Tasks have completed (success or failure)
- Action: mark aggregation as ready
- Side effect: update stats.createdOrders, stats.failedOrders

**QUEUED → DISPATCHING**
- Pre-condition: all aggregations with isComplete == true have been enqueued for messaging
- Action: begin message dispatch
- Side effect: update stats.totalMessages

**DISPATCHING → COMPLETE**
- Pre-condition: stats.sentMessages + stats.failedMessages + stats.dlqMessages == stats.totalMessages
- Pre-condition: stats.failedMessages == 0 AND stats.dlqMessages == 0
- Action: mark batch as complete

**DISPATCHING → PARTIAL_FAILURE**
- Pre-condition: stats.sentMessages + stats.failedMessages + stats.dlqMessages == stats.totalMessages
- Pre-condition: stats.failedMessages > 0 OR stats.dlqMessages > 0
- Action: mark batch as partial failure, admin can retry from DLQ

**Any → PAUSED**
- Action: stop enqueuing new Cloud Tasks for this batch
- Already-in-flight tasks continue to completion (Cloud Tasks cannot be recalled)
- Record `pausedAt` and the stage where paused

**PAUSED → (previous stage)**
- Action: resume enqueuing tasks from where paused
- Return to the stage recorded at pause time

**Any → CANCELLED**
- Action: stop enqueuing new Cloud Tasks
- Already-in-flight tasks continue (cannot be recalled)
- Record `cancelledAt` and `cancelReason`
- Messaging workers check batch status before sending — if CANCELLED, skip and mark as 'cancelled' in comm_log

## Implementation

```typescript
// BatchStateMachine.ts

const VALID_TRANSITIONS: Record<string, string[]> = {
  UPLOADED:        ['RESOLVING'],
  RESOLVING:       ['ORDERING', 'PAUSED', 'CANCELLED'],
  ORDERING:        ['QUEUED', 'PAUSED', 'CANCELLED'],
  QUEUED:          ['DISPATCHING', 'CANCELLED'],
  DISPATCHING:     ['COMPLETE', 'PARTIAL_FAILURE', 'PAUSED', 'CANCELLED'],
  PAUSED:          ['RESOLVING', 'ORDERING', 'DISPATCHING', 'CANCELLED'],
  // COMPLETE, PARTIAL_FAILURE, CANCELLED are terminal states
};

async function transitionBatch(
  batchId: string,
  targetStatus: string,
  trigger: string
): Promise<void> {
  await firestore.runTransaction(async (txn) => {
    const batchRef = firestore.collection('specimen_batches').doc(batchId);
    const batch = await txn.get(batchRef);
    const currentStatus = batch.data().status;

    if (!VALID_TRANSITIONS[currentStatus]?.includes(targetStatus)) {
      throw new Error(
        `Invalid transition: ${currentStatus} → ${targetStatus}`
      );
    }

    txn.update(batchRef, {
      previousStatus: currentStatus,
      status: targetStatus,
      statusChangedAt: FieldValue.serverTimestamp(),
      statusHistory: FieldValue.arrayUnion({
        status: targetStatus,
        timestamp: new Date().toISOString(),
        trigger: trigger,
      }),
    });
  });
}
```

---

# 17. DEAD LETTER QUEUE (DLQ) DESIGN (NEW)

## Overview

The DLQ handles messages that exhaust all Cloud Task retries. Without a DLQ, these messages silently vanish — unacceptable for a system whose purpose is guaranteed distribution.

## Flow

```
Cloud Tasks Queue (specimen-whatsapp or specimen-email)
        |
        v
Messaging Worker
        |
        +── Success → write comm_log (status: 'sent')
        |              write teacher_communications
        |
        +── Failure (retryable) → Cloud Tasks auto-retries (up to maxAttempts)
        |
        +── Failure (maxAttempts exhausted) → DLQ Handler
                |
                +── Write to failed_messages/
                +── Update comm_log (status: 'dlq')
                +── Write to batch_errors/
                +── Increment batch stats.dlqMessages
                |
                v
        Admin Dashboard (DLQ Viewer)
                |
                +── [ Retry Selected ]
                |       |
                |       v
                |   Re-enqueue to Cloud Tasks
                |   (reset attempt count)
                |       |
                |       v
                |   Messaging Worker (normal flow)
                |
                +── [ Skip / Mark Resolved ]
                        |
                        v
                    Update failed_messages (resolution: 'skipped')
                    Decrement batch stats.dlqMessages
```

## Error Classification

The DLQ handler classifies errors to determine retryability:

| Error Type | Retryable | Action |
|-----------|-----------|--------|
| RATE_LIMIT | Yes (after cooldown) | Set retryAfter timestamp |
| API_DOWN | Yes (after delay) | Retry in next DLQ sweep |
| TIMEOUT | Yes | Retry immediately |
| INVALID_PHONE | No | Mark for admin review |
| INVALID_EMAIL | No | Mark for admin review |
| TEMPLATE_ERROR | No | Requires code fix |
| UNKNOWN | Yes (first time) | Retry once, then escalate |

## Implementation

```typescript
// DLQService.ts

async function handleMaxRetriesExhausted(
  messageId: string,
  error: Error,
  attemptCount: number
): Promise<void> {
  const commLog = await CommLogRepository.get(messageId);
  const errorType = classifyError(error);

  // 1. Write to DLQ
  await FailedMessagesRepository.create({
    originalMessageId: messageId,
    batchId: commLog.batchId,
    teacherPhone: commLog.teacherPhone,
    channel: commLog.channel,
    messageHash: commLog.messageHash,
    payload: commLog.payload,
    totalAttempts: attemptCount,
    lastError: error.message,
    lastErrorType: errorType,
    isRetryable: isRetryableError(errorType),
    retryAfter: errorType === 'RATE_LIMIT' ? getRetryAfterTime(error) : null,
    manuallyRetried: false,
    resolution: null,
    createdAt: FieldValue.serverTimestamp(),
  });

  // 2. Update comm_log
  await CommLogRepository.update(messageId, {
    status: 'dlq',
    movedToDlqAt: FieldValue.serverTimestamp(),
  });

  // 3. Write batch error
  await BatchErrorRepository.create({
    batchId: commLog.batchId,
    stage: 'messaging',
    teacherPhone: commLog.teacherPhone,
    errorType: errorType,
    errorMessage: error.message,
    isRetryable: isRetryableError(errorType),
  });

  // 4. Update batch stats
  await BatchRepository.incrementStat(commLog.batchId, 'dlqMessages', 1);
}

async function retryFromDLQ(
  failedMessageIds: string[]
): Promise<{ enqueued: number; skipped: number }> {
  let enqueued = 0;
  let skipped = 0;

  for (const id of failedMessageIds) {
    const failed = await FailedMessagesRepository.get(id);

    if (!failed.isRetryable) {
      skipped++;
      continue;
    }

    if (failed.retryAfter && new Date() < failed.retryAfter.toDate()) {
      skipped++; // too early to retry
      continue;
    }

    // Check batch status — don't retry if cancelled
    const batch = await BatchRepository.get(failed.batchId);
    if (batch.status === 'CANCELLED') {
      skipped++;
      continue;
    }

    // Re-enqueue to appropriate Cloud Tasks queue
    const queue = failed.channel === 'whatsapp'
      ? 'specimen-whatsapp'
      : 'specimen-email';

    await CloudTasksAdapter.enqueue(queue, {
      messageId: failed.originalMessageId,
      teacherPhone: failed.teacherPhone,
      payload: failed.payload,
      isRetryFromDLQ: true,
    });

    // Update DLQ record
    await FailedMessagesRepository.update(id, {
      manuallyRetried: true,
      manuallyRetriedAt: FieldValue.serverTimestamp(),
    });

    // Update comm_log back to queued
    await CommLogRepository.update(failed.originalMessageId, {
      status: 'queued',
      attemptCount: 0, // reset for new attempt cycle
    });

    enqueued++;
  }

  return { enqueued, skipped };
}

function classifyError(error: Error): string {
  const msg = error.message.toLowerCase();
  if (msg.includes('rate limit') || msg.includes('429')) return 'RATE_LIMIT';
  if (msg.includes('timeout') || msg.includes('ETIMEDOUT')) return 'TIMEOUT';
  if (msg.includes('invalid phone') || msg.includes('not on whatsapp')) return 'INVALID_PHONE';
  if (msg.includes('invalid email') || msg.includes('bounce')) return 'INVALID_EMAIL';
  if (msg.includes('template')) return 'TEMPLATE_ERROR';
  if (msg.includes('503') || msg.includes('502') || msg.includes('unavailable')) return 'API_DOWN';
  return 'UNKNOWN';
}
```

## Messaging Worker — DLQ Integration

The messaging worker (Cloud Task handler) must detect when it's the final attempt and route to DLQ:

```typescript
// messagingWorker.ts

async function handleMessageTask(req: CloudTaskRequest): Promise<void> {
  const { messageId, teacherPhone, payload, isRetryFromDLQ } = req.body;
  const attemptNumber = parseInt(req.headers['x-cloudtasks-taskretrycount'] || '0') + 1;
  const maxAttempts = 5;

  // Check batch status before sending
  const commLog = await CommLogRepository.get(messageId);
  const batch = await BatchRepository.get(commLog.batchId);
  if (batch.status === 'CANCELLED' || batch.status === 'PAUSED') {
    await CommLogRepository.update(messageId, { status: 'cancelled' });
    return; // exit without error (don't retry)
  }

  // Idempotency check
  if (commLog.externalMessageId && commLog.status === 'sent') {
    return; // already sent, skip
  }

  try {
    const result = commLog.channel === 'whatsapp'
      ? await WATIAdapter.sendTemplate(teacherPhone, payload)
      : await ResendAdapter.sendEmail(teacherPhone, payload);

    // Success
    await CommLogRepository.update(messageId, {
      status: 'sent',
      externalMessageId: result.messageId,
      lastAttemptAt: FieldValue.serverTimestamp(),
      attemptCount: attemptNumber,
    });

    await TeacherCommunicationsRepository.create({
      teacherId: commLog.teacherId,
      teacherPhone: teacherPhone,
      batchId: commLog.batchId,
      channel: commLog.channel,
      products: payload.products,
      messagePayload: payload,
      externalMessageId: result.messageId,
      sentAt: FieldValue.serverTimestamp(),
      deliveryStatus: 'sent',
    });

    await BatchRepository.incrementStat(commLog.batchId, 'sentMessages', 1);

  } catch (error) {
    // Update attempt tracking
    await CommLogRepository.update(messageId, {
      lastAttemptAt: FieldValue.serverTimestamp(),
      attemptCount: attemptNumber,
      lastError: error.message,
    });

    if (attemptNumber >= maxAttempts) {
      // Max retries exhausted → DLQ
      await DLQService.handleMaxRetriesExhausted(messageId, error, attemptNumber);
      return; // don't throw, so Cloud Tasks doesn't retry again
    }

    // Throw to trigger Cloud Tasks retry
    throw error;
  }
}
```

## Admin DLQ Operations

| Action | Endpoint | Behavior |
|--------|----------|----------|
| View DLQ | GET /dlq?batchId=X | List failed messages, filterable |
| Retry selected | POST /dlq/retry { failedMessageIds } | Re-enqueue specific messages |
| Retry all retryable | POST /dlq/retry { retryAll: true, batchId } | Re-enqueue all retryable for batch |
| Skip/resolve | POST /dlq/{id}/resolve { resolution } | Mark as skipped or resolved |
| View stats | GET /batches/{batchId} | Batch stats include dlqMessages count |

---

# 18. ARCHITECTURE REVIEW NOTES (NEW)

This section documents known risks, design decisions, and their rationale. Intended as a living document for the engineering team.

## 18.1 Firebase Functions v2 Is Required

Firebase Functions v1 handles one request per instance. At 20K teachers per batch, the upload/resolution endpoint would block all other API calls. Functions v2 (Cloud Run-based) supports concurrency — multiple requests per instance.

**Action:** All Firebase Functions must be deployed as v2. Set `concurrency: 80` on API handlers, `concurrency: 1` on messaging workers (to prevent race conditions on comm_log writes).

## 18.2 Firestore Cost Model Awareness

At 100K teachers with active batches:

| Operation | Estimated Volume | Cost (per batch) |
|-----------|-----------------|-------------------|
| phone_lookup reads | 20K-40K | ~$0.02 |
| teachers_master writes | 5K-20K | ~$0.04 |
| orders writes | 20K-60K | ~$0.10 |
| temp_aggregation writes | 20K-60K | ~$0.10 |
| comm_log writes | 20K-40K | ~$0.04 |

Estimated Firestore cost per 20K-teacher batch: **$0.30 - $0.80** (reads + writes). Acceptable at current scale. Monitor with Firestore usage dashboard.

## 18.3 Existing Order System Integration Contract

The interface between VSDS and the existing order system is a critical dependency. Define explicitly:

```
Input: POST /orders/create
  {
    orderType: 'specimen',
    teacherRecordId: string,
    teacherPhone: string,
    productId: string,
    batchId: string,
    paymentStatus: 'specimen_free'   // or whatever the existing system expects
  }

Output:
  {
    orderId: string,
    signedUrl: string,
    qrUrl: string,
    expiresAt: string               // ISO timestamp
  }

Expected latency: < 5 seconds per order
Burst capacity: must handle 20 concurrent order creation requests (Cloud Tasks concurrency)
```

If the existing system was not designed for 20 concurrent specimen order requests, the `specimen-orders` Cloud Tasks queue provides backpressure. Adjust `maxConcurrentDispatches` down if needed.

## 18.4 WATI Rate Limits and Banning Risk

WATI enforces per-number rate limits. Sending too fast can result in temporary or permanent number banning by WhatsApp. The `specimen-whatsapp` queue is throttled to 8 msg/sec as a safety margin.

**Monitor:** WATI provides rate limit headers. If 429 responses increase, automatically reduce `maxDispatchesPerSecond` (or implement adaptive throttling in the messaging worker).

## 18.5 Observability Requirements

| Layer | Tool | What to Monitor |
|-------|------|-----------------|
| Cloud Functions | Cloud Logging (structured) | Error rates, cold starts, execution time |
| Cloud Tasks | Cloud Monitoring | Queue depth, dispatch rate, failure rate |
| Firestore | Usage dashboard | Read/write counts, hotspot detection |
| Application | Custom metrics (batch_errors collection) | Per-batch error rates by stage |
| Messaging | Delivery webhooks | Delivery rate, read rate, failure rate |

**Alerting rules:**
- DLQ size > 100 for any batch → alert
- Cloud Tasks error rate > 10% → alert
- Batch stuck in same state > 30 minutes → alert
- WATI 429 rate > 5% → alert and auto-throttle

---

# END OF DOCUMENT
