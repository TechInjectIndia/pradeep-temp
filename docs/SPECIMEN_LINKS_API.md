# Specimen Links API

## Flow

1. **Upload teachers** → Save teachers, get teacher IDs
2. **Send teacherProducts** → teacherId-wise productIds with quantity
3. **Receive links** → teacherId-wise productId-wise links (array per quantity)
4. **Saved** → Response stored in `batch_links` collection

---

## 1. Upload (Save Teachers, Get IDs)

### POST `/specimenUploadReviewed`

**Request:**
```json
{
  "rows": [
    {
      "name": "Teacher Name",
      "phone": "+919876543210",
      "email": "teacher@school.com",
      "school": "School Name",
      "books": "Math 10, Science 10",
      "channels": "email"
    }
  ]
}
```

**Response:**
```json
{
  "batchId": "abc123",
  "teacherCount": 2,
  "teachers": [
    {
      "teacherId": "teacherRecordId1",
      "name": "Teacher Name",
      "phone": "+919876543210",
      "email": "teacher@school.com",
      "school": "School Name",
      "books": "Math 10, Science 10"
    }
  ],
  "status": "RESOLVING"
}
```

Use `teachers[].teacherId` for the next step.

---

## 2. Generate Links (Send Products, Get Links)

### POST `/specimenGenerateLinks`

**Request (Payload):**
```json
{
  "batchId": "abc123",
  "teacherProducts": {
    "teacherRecordId1": {
      "productId1": 2,
      "productId2": 1
    },
    "teacherRecordId2": {
      "productId1": 1
    }
  }
}
```

- `teacherProducts[teacherId][productId]` = quantity (number of links to generate)

**Response:**
```json
{
  "batchId": "abc123",
  "links": {
    "teacherRecordId1": {
      "productId1": [
        "https://specimens.example.com/view/abc123/teacherRecordId1/productId1",
        "https://specimens.example.com/view/abc123/teacherRecordId1/productId1?q=2"
      ],
      "productId2": [
        "https://specimens.example.com/view/abc123/teacherRecordId1/productId2"
      ]
    },
    "teacherRecordId2": {
      "productId1": [
        "https://specimens.example.com/view/abc123/teacherRecordId2/productId1"
      ]
    }
  },
  "expiresAt": "2026-06-18T00:00:00.000Z",
  "savedTo": "batch_links",
  "savedDocId": "docId123"
}
```

- `links[teacherId][productId]` = array of URLs (length = quantity)
- Response is saved in Firestore `batch_links` collection

---

## 3. Fetch Saved Links (Batch-wise)

### GET `/specimenBatchLinks?batchId=abc123`

**Response:**
```json
{
  "id": "docId123",
  "batchId": "abc123",
  "links": {
    "teacherRecordId1": {
      "productId1": ["url1", "url2"],
      "productId2": ["url3"]
    }
  },
  "expiresAt": "2026-06-18T00:00:00.000Z",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Firestore Collections

| Collection    | Purpose                                      |
|---------------|----------------------------------------------|
| `teachers_raw`| Raw teacher data (from upload)                |
| `batch_links` | Generated links per batch (what you received) |
