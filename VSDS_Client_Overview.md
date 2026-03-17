# Virtual Specimen Distribution System (VSDS)
## Product Overview — Client Edition

**Version:** 3.0
**Date:** March 2026

---

## What is VSDS?

VSDS is a platform that automates the distribution of digital LMS book specimens to teachers at scale. Instead of manually sending specimen links to each teacher, your team uploads a list — and the system takes care of everything: identifying teachers, generating access links, and delivering them via WhatsApp and/or email.

**At a glance, the system can handle:**
- 20,000+ teachers per distribution batch
- 100,000+ teachers stored in the system
- 36,000+ messages dispatched per hour

---

## Core Capabilities

### 1. Bulk Teacher Upload
Admins upload an Excel file containing teacher information (name, phone, email, school, city, and the books to be sent). The system validates the file, previews the data before confirmation, and creates a distribution batch.

### 2. Smart Teacher Identity Resolution
Before creating any orders, the system automatically identifies whether each uploaded teacher already exists in the database:
- **Phone/email match** — Instantly links to an existing teacher record.
- **Fuzzy name + school match** — If no exact match is found, the system uses intelligent name and school matching to find probable matches.
- **Confidence scoring** — Each potential match is scored:
  - **High confidence (>90%)** → Automatically merged with the existing record.
  - **Medium confidence (70–90%)** → Flagged for admin review as a possible duplicate.
  - **Low confidence (<70%)** → A new teacher record is created.

Duplicate flags are non-blocking — the distribution continues while admin reviews them in parallel.

### 3. Specimen Order Creation
Once teachers are identified, the system automatically creates digital specimen orders for each teacher across all specified books. Access links and QR codes are generated for each order.

### 4. Multi-Channel Message Distribution
Specimen links are delivered to teachers via:
- **WhatsApp** — Using approved message templates.
- **Email** — Branded specimen delivery emails.

Each teacher receives a single, consolidated message containing all their specimen links — not one message per book.

### 5. Delivery Status Tracking
The system tracks what happens to each message after it's sent:
- **Sent** → Message left the system.
- **Delivered** → Message reached the teacher's device.
- **Read** → Teacher opened the message. *(WhatsApp only)*
- **Failed** → Delivery could not be completed.

---

## Admin Dashboard

### Main Dashboard
A summary view showing:
- Total teachers in the system
- Messages sent today
- Active batches in progress
- Queue size
- Failed messages requiring attention

### Upload Flow
1. Admin downloads the Excel template.
2. Fills in teacher data (name, phone, email, school, city, books).
3. Drags and drops the file into the dashboard.
4. Reviews a preview showing teacher count and order count.
5. Clicks **Start Distribution** to launch the batch.

### Batch Monitor
Each batch has a live progress view showing:

| Stage | What it means |
|-------|--------------|
| **Uploaded** | File accepted and validated |
| **Resolving** | System is identifying teachers |
| **Ordering** | Specimen orders being created |
| **Queued** | Orders complete, messaging ready |
| **Dispatching** | Messages being sent |
| **Complete** | All messages delivered successfully |
| **Partial Failure** | Some messages failed — admin action required |

Each stage shows a progress bar, count of successes, and count of failures. Admins can drill into errors for any stage.

**Batch controls:**
- **Pause** — Temporarily stop a running batch (useful if an issue is detected mid-run).
- **Resume** — Continue a paused batch from where it left off.
- **Cancel** — Stop a batch entirely.

### Duplicate Review
When the system flags a possible duplicate teacher, admins see a side-by-side comparison:
- Incoming record (from the uploaded file)
- Existing record in the system
- Confidence score and reason for the match

Admin can choose to **Merge** (treat as the same teacher) or **Keep Separate** (create a new record).

### Error Viewer
If any teachers fail at any stage (identity resolution, order creation, or messaging), the Error Viewer shows:
- Which stage failed
- Which teacher was affected
- What the error was
- Whether it can be retried automatically

Admins can click **Retry All Retryable** to re-attempt failed items in bulk.

### Failed Messages (Recovery Queue)
Messages that fail repeatedly after multiple automatic retries land in the **Failed Messages** queue. Admins can:
- View all failed messages, filtered by batch or channel (WhatsApp / Email).
- Retry selected messages individually.
- Retry all recoverable failures in one click.
- Mark messages as resolved/skipped if the teacher contact is invalid.

---

## End-to-End Workflow

```
Admin uploads Excel file
        ↓
System validates and previews data
        ↓
Admin confirms → Batch created
        ↓
System identifies each teacher (auto or fuzzy match)
        ↓
Possible duplicates flagged for admin review (non-blocking)
        ↓
Specimen orders created for each teacher × book combination
        ↓
Access links and QR codes generated
        ↓
All links aggregated per teacher into one message
        ↓
Messages dispatched via WhatsApp and/or Email
        ↓
Delivery status tracked (Sent → Delivered → Read)
        ↓
Failures automatically retried → Failed messages surfaced for admin
        ↓
Batch marked Complete or Partial Failure
```

---

## Key User Roles

### Admin
- Uploads teacher lists
- Monitors batch progress
- Reviews and resolves duplicate teacher records
- Reviews errors and triggers retries
- Acts on failed messages

### Teacher (End Recipient)
- Receives a WhatsApp or email message containing specimen links
- Clicks a link or scans a QR code to access their LMS specimens
- No account creation or manual steps required

---

## Phased Delivery

| Phase | What's Delivered |
|-------|-----------------|
| **Phase 1** | Teacher upload, identity resolution, specimen order creation |
| **Phase 2** | WhatsApp + email delivery, error handling, failed message recovery |
| **Phase 3** | Admin tools — duplicate review, error viewer, batch controls, delivery status |
| **Phase 4** | Advanced matching intelligence, analytics dashboard, campaign segmentation |

---

## Future Capabilities (Roadmap)

- Teacher engagement analytics (did teachers actually open the app?)
- Adoption tracking and territory-level reporting
- Sales rep attribution (which rep's territory is converting?)
- Predictive adoption scoring
- Multi-publisher support

---

*This document is intended for client review. Technical architecture, infrastructure, and implementation details are covered in a separate engineering specification.*
