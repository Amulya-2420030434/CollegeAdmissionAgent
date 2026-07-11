"""
models.py
---------
This file defines simple Python data classes / schema helpers used across
the College Admission Agent backend.

Since this project currently runs on dummy JSON data (no real database),
these classes are lightweight and mainly used for:
  1. Documenting the shape of the data flowing through the API
  2. Validating/serializing chat messages and uploaded documents
  3. Making it easy to swap in a real database (SQLAlchemy / MongoDB) later
     without touching the route logic in routes.py

When you're ready to move to a real database, replace these plain classes
with ORM models (e.g. SQLAlchemy `db.Model` subclasses) but keep the same
field names so the rest of the app keeps working.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class ChatMessage:
    """
    Represents a single message exchanged in the Admission Chat.

    Attributes:
        sender: either "user" or "assistant"
        message: the raw text content of the message
        timestamp: ISO formatted time the message was created
        session_id: groups messages belonging to the same chat session
    """
    sender: str
    message: str
    session_id: str = "default"
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self):
        """Convert the dataclass into a JSON-serializable dictionary."""
        return {
            "sender": self.sender,
            "message": self.message,
            "session_id": self.session_id,
            "timestamp": self.timestamp,
        }


@dataclass
class UploadedDocument:
    """
    Represents metadata about an admission document (PDF) uploaded by a student.

    Attributes:
        filename: original filename as uploaded by the client
        stored_path: path where the file was saved on the server
        size_bytes: size of the uploaded file
        uploaded_at: ISO formatted upload timestamp
        status: processing status - "received", "processing", "indexed", "failed"
    """
    filename: str
    stored_path: str
    size_bytes: int
    status: str = "received"
    uploaded_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self):
        return {
            "filename": self.filename,
            "stored_path": self.stored_path,
            "size_bytes": self.size_bytes,
            "status": self.status,
            "uploaded_at": self.uploaded_at,
        }


@dataclass
class Course:
    """Represents a single academic course/program offered by the college."""
    id: str
    name: str
    department: str
    duration: str
    eligibility: str
    seats: int
    avgPackage: str
    description: str


@dataclass
class Scholarship:
    """Represents a scholarship program available to students."""
    id: str
    name: str
    type: str
    coverage: str
    eligibility: str
    deadline: str
    renewable: bool


@dataclass
class FeeStructure:
    """Represents the fee breakdown for a specific course."""
    id: str
    course: str
    tuitionPerYear: int
    hostelPerYear: int
    examFee: int
    otherCharges: int
    totalPerYear: int


@dataclass
class Application:
    """
    Represents a student's submitted application — either for a course
    (admission) or a scholarship. Created when a student fills out the
    "Apply Now" form on the Course Finder or Scholarship page.

    Attributes:
        id: unique application reference number shown to the student
        applicant_name: full name of the applicant
        email: contact email
        phone: contact phone number
        application_type: "course" or "scholarship"
        reference_id: the id of the course/scholarship being applied for
        reference_name: the display name of that course/scholarship
        message: optional note from the applicant
        status: "submitted" (dummy pipeline — no real review workflow yet)
        submitted_at: ISO formatted submission timestamp
    """
    id: str
    applicant_name: str
    email: str
    phone: str
    application_type: str
    reference_id: str
    reference_name: str
    message: str = ""
    status: str = "submitted"
    submitted_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def to_dict(self):
        return {
            "id": self.id,
            "applicant_name": self.applicant_name,
            "email": self.email,
            "phone": self.phone,
            "application_type": self.application_type,
            "reference_id": self.reference_id,
            "reference_name": self.reference_name,
            "message": self.message,
            "status": self.status,
            "submitted_at": self.submitted_at,
        }
