"""
utils.py
--------
Small, reusable helper functions used across the backend:
  - Loading dummy JSON data from disk (data/*.json)
  - Validating uploaded files (PDF only, size limits)
  - Building consistent success/error API response envelopes
  - Basic keyword extraction used by the rule-based chatbot fallback

Keeping these helpers isolated from routes.py keeps the route handlers
short and focused purely on request/response wiring.
"""

import json
import os

# Absolute path to the backend/data directory, regardless of where the
# app is launched from. This avoids "file not found" bugs in production.
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")

# Folder where uploaded admission PDFs are temporarily stored.
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")

# Only PDF files are accepted for the admission document upload feature.
ALLOWED_EXTENSIONS = {"pdf"}

# 10 MB upload size limit — generous enough for scanned admission documents.
MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024


def load_json_data(filename: str):
    """
    Load and parse a JSON file from the backend/data directory.

    Args:
        filename: name of the JSON file, e.g. "courses.json"

    Returns:
        Parsed Python object (list or dict). Returns an empty list if the
        file is missing or invalid, so API endpoints never crash outright.
    """
    file_path = os.path.join(DATA_DIR, filename)
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def allowed_file(filename: str) -> bool:
    """Check whether the uploaded filename has an allowed extension."""
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


def success_response(data=None, message: str = "Success", status_code: int = 200):
    """
    Build a consistent success response envelope used by every endpoint.

    Example:
        { "success": true, "message": "Success", "data": [...] }
    """
    return {
        "success": True,
        "message": message,
        "data": data,
    }, status_code


def error_response(message: str = "Something went wrong", status_code: int = 400):
    """
    Build a consistent error response envelope used by every endpoint.

    Example:
        { "success": false, "message": "Invalid request", "data": null }
    """
    return {
        "success": False,
        "message": message,
        "data": None,
    }, status_code


def ensure_upload_dir_exists():
    """Create the uploads directory on first use if it doesn't already exist."""
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR, exist_ok=True)


# Path to the file where submitted applications (course/scholarship) are
# persisted. Using a plain JSON file keeps this dependency-free — swap for
# a real database later without touching routes.py's calling code.
APPLICATIONS_FILE = os.path.join(DATA_DIR, "applications.json")


def load_applications():
    """Load all previously submitted applications (returns [] if none yet)."""
    try:
        with open(APPLICATIONS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def save_application(application_dict: dict):
    """
    Append a new application to the persisted applications JSON file.

    Args:
        application_dict: a JSON-serializable dict (see models.Application.to_dict())
    """
    applications = load_applications()
    applications.append(application_dict)
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(APPLICATIONS_FILE, "w", encoding="utf-8") as f:
        json.dump(applications, f, indent=2)


# Simple keyword map used by the rule-based fallback chatbot logic.
# This lets the /chat endpoint give reasonably useful answers even before
# IBM watsonx.ai / Granite is wired in (see rag.py -> generate_ibm_response).
INTENT_KEYWORDS = {
    "eligibility": ["eligibility", "eligible", "criteria", "qualify", "cutoff"],
    "courses": ["course", "courses", "program", "programs", "branch", "stream"],
    "hostel": ["hostel", "accommodation", "dorm", "room"],
    "placements": ["placement", "placements", "job", "package", "recruit"],
    "fees": ["fee", "fees", "tuition", "cost", "payment"],
    "scholarships": ["scholarship", "scholarships", "financial aid", "waiver"],
    "documents": ["document", "documents", "certificate", "papers", "required"],
    "admission_process": ["admission process", "how to apply", "apply", "process", "steps"],
    "important_dates": ["date", "dates", "deadline", "last date", "schedule"],
}


def detect_intent(message: str) -> str:
    """
    Very small rule-based intent detector used by the fallback chatbot logic
    in rag.py before a real LLM (IBM Granite) is connected.

    Args:
        message: the raw user message

    Returns:
        A string key describing the detected intent, or "general" if no
        keyword matched.
    """
    lowered = message.lower()
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(keyword in lowered for keyword in keywords):
            return intent
    return "general"
