# API Reference — College Admission Agent

Base URL (local dev): `http://localhost:5000/api`
(The Vite frontend proxies `/api/*` to this base URL automatically — see `frontend/vite.config.js`.)

All responses share this envelope:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": { }
}
```

---

## `GET /api/health`
Simple health check.

**Response**
```json
{ "success": true, "message": "College Admission Agent API is running", "data": { "status": "ok" } }
```

---

## `POST /api/chat`
Send a message to the Admission Chat assistant.

**Body**
```json
{ "message": "What is the eligibility for B.Tech?", "session_id": "abc123" }
```

**Response**
```json
{
  "success": true,
  "message": "Reply generated",
  "data": {
    "sender": "assistant",
    "message": "Eligibility criteria vary by course...",
    "session_id": "abc123",
    "timestamp": "2026-07-08T12:00:00"
  }
}
```

Internally this calls `rag.py`'s `generate_fallback_response()` (rule-based
today). `generate_ibm_response()` is already wired in as the designated
integration point for IBM watsonx.ai's Granite model — see that file's
docstring for exact integration steps.

---

## `POST /api/upload`
Upload an admission PDF document (multipart/form-data, field name `file`).

**Response**
```json
{
  "success": true,
  "message": "File uploaded successfully. It will be indexed for AI-powered search soon.",
  "data": {
    "filename": "marksheet.pdf",
    "stored_path": "/absolute/path/to/backend/uploads/<uuid>_marksheet.pdf",
    "size_bytes": 123456,
    "status": "received",
    "uploaded_at": "2026-07-08T12:00:00"
  }
}
```

Only `.pdf` files up to 10MB are accepted.

---

## `GET /api/courses`
Returns all courses. Optional query param: `?department=Engineering`.

## `GET /api/scholarships`
Returns all scholarships.

## `GET /api/fees`
Returns the course-wise fee structure.

---

## `POST /api/apply`
Submit a student application for a course (admission) or a scholarship.
Triggered from the "Apply Now" button inside the course/scholarship detail
modal on the frontend.

**Body**
```json
{
  "applicant_name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "9876543210",
  "application_type": "course",
  "reference_id": "cse101",
  "reference_name": "B.Tech Computer Science & Engineering",
  "message": "optional note"
}
```
`application_type` must be `"course"` or `"scholarship"`. All fields except `message` are required.

**Response**
```json
{
  "success": true,
  "message": "Application submitted successfully! Your reference number is APP-1EB5F5DC.",
  "data": {
    "id": "APP-1EB5F5DC",
    "applicant_name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543210",
    "application_type": "course",
    "reference_id": "cse101",
    "reference_name": "B.Tech Computer Science & Engineering",
    "message": "optional note",
    "status": "submitted",
    "submitted_at": "2026-07-09T09:20:52.083451"
  }
}
```

Applications are persisted to `backend/data/applications.json` (created
automatically on first submission).

## `GET /api/applications`
Returns every application submitted so far — useful for an admin view or
verifying submissions during testing.

---

## Error responses
Any failure returns:
```json
{ "success": false, "message": "Description of what went wrong", "data": null }
```
with an appropriate HTTP status code (400, 404, 500).
