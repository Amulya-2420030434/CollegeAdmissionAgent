"""
routes.py
---------
Defines all REST API endpoints for the College Admission Agent as a Flask
Blueprint. Registered onto the main Flask app inside app.py.

Endpoints:
    POST /api/chat          -> chatbot conversation endpoint
    POST /api/upload        -> admission PDF upload endpoint
    GET  /api/courses       -> list of available courses
    GET  /api/scholarships  -> list of available scholarships
    GET  /api/fees          -> course-wise fee structure
    GET  /api/health        -> simple health check (useful for uptime monitors)

All responses follow a consistent JSON envelope defined in utils.py:
    { "success": bool, "message": str, "data": any }
"""

import os
import uuid

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename

from utils import (
    load_json_data,
    allowed_file,
    success_response,
    error_response,
    ensure_upload_dir_exists,
    UPLOAD_DIR,
    MAX_UPLOAD_SIZE_BYTES,
    load_applications,
    save_application,
)
from models import ChatMessage, UploadedDocument, Application
from rag import generate_fallback_response, generate_ibm_response, retrieve_relevant_context

# All routes in this file are prefixed with /api (see app.py where the
# blueprint is registered with url_prefix="/api").
api = Blueprint("api", __name__)


@api.route("/health", methods=["GET"])
def health_check():
    """Simple endpoint to verify the API is up and running."""
    body, status = success_response(data={"status": "ok"}, message="College Admission Agent API is running")
    return jsonify(body), status


@api.route("/chat", methods=["POST"])
def chat():
    """
    POST /api/chat
    Body: { "message": "What is the eligibility for B.Tech?", "session_id": "abc123" }

    Handles a single turn of the Admission Chat conversation.

    Flow:
      1. Validate the incoming message.
      2. (Placeholder) Retrieve relevant context from uploaded admission
         documents via retrieve_relevant_context() — this is the "R" in RAG.
      3. Attempt to generate a response using IBM Granite via
         generate_ibm_response(). Since that's a placeholder today, we
         instead use generate_fallback_response() for a real, useful answer
         built from dummy JSON data.
      4. Return the assistant's reply in a consistent JSON envelope.
    """
    payload = request.get_json(silent=True) or {}
    user_message = payload.get("message", "").strip()
    session_id = payload.get("session_id", "default")

    if not user_message:
        body, status = error_response("Message cannot be empty", 400)
        return jsonify(body), status

    # Step 1: log the incoming user message (in-memory demonstration only)
    ChatMessage(sender="user", message=user_message, session_id=session_id)

    # Step 2: RAG placeholder — will pull context from uploaded PDFs later
    retrieved_context = retrieve_relevant_context(user_message)

    # Step 3: Try the IBM Granite placeholder first (kept for architectural
    # clarity), but since it currently just echoes a placeholder string,
    # we generate the actual reply shown to the user with the rule-based
    # fallback so the demo is fully functional today.
    _ibm_placeholder_reply = generate_ibm_response(user_message, retrieved_context)  # noqa: F841
    assistant_reply = generate_fallback_response(user_message)

    reply_obj = ChatMessage(sender="assistant", message=assistant_reply, session_id=session_id)

    body, status = success_response(data=reply_obj.to_dict(), message="Reply generated")
    return jsonify(body), status


@api.route("/upload", methods=["POST"])
def upload_document():
    """
    POST /api/upload
    Form-data: file=<admission.pdf>

    Accepts a PDF admission document upload (marksheets, brochures, etc.)
    Saves it to backend/uploads/ and returns metadata about the stored file.

    NOTE: This is a dummy upload + RAG placeholder pipeline. The file is
    saved but NOT actually parsed/embedded yet. Once a real RAG pipeline is
    built, this is where you would:
      1. Extract text from the PDF (e.g. using PyPDF2 / pdfplumber)
      2. Chunk the text
      3. Generate embeddings (e.g. via IBM watsonx.ai embeddings API)
      4. Store vectors in a vector database for retrieve_relevant_context()
         (see rag.py) to search against.
    """
    if "file" not in request.files:
        body, status = error_response("No file part in the request", 400)
        return jsonify(body), status

    file = request.files["file"]

    if file.filename == "":
        body, status = error_response("No file selected", 400)
        return jsonify(body), status

    if not allowed_file(file.filename):
        body, status = error_response("Only PDF files are allowed", 400)
        return jsonify(body), status

    ensure_upload_dir_exists()

    # Prefix with a UUID to avoid filename collisions between students.
    safe_name = secure_filename(file.filename)
    unique_name = f"{uuid.uuid4().hex}_{safe_name}"
    stored_path = os.path.join(UPLOAD_DIR, unique_name)

    file.save(stored_path)
    file_size = os.path.getsize(stored_path)

    if file_size > MAX_UPLOAD_SIZE_BYTES:
        os.remove(stored_path)
        body, status = error_response("File exceeds 10MB size limit", 400)
        return jsonify(body), status

    # PLACEHOLDER: this is where PDF text extraction + embedding would be
    # triggered for the RAG pipeline (see rag.py -> retrieve_relevant_context).
    document = UploadedDocument(
        filename=safe_name,
        stored_path=stored_path,
        size_bytes=file_size,
        status="received",
    )

    body, status = success_response(
        data=document.to_dict(),
        message="File uploaded successfully. It will be indexed for AI-powered search soon.",
    )
    return jsonify(body), status


@api.route("/courses", methods=["GET"])
def get_courses():
    """
    GET /api/courses
    Returns the list of available academic courses/programs from dummy JSON data.
    Supports optional ?department=Engineering query filter.
    """
    courses = load_json_data("courses.json")

    department_filter = request.args.get("department")
    if department_filter:
        courses = [c for c in courses if c["department"].lower() == department_filter.lower()]

    body, status = success_response(data=courses, message=f"{len(courses)} course(s) found")
    return jsonify(body), status


@api.route("/scholarships", methods=["GET"])
def get_scholarships():
    """
    GET /api/scholarships
    Returns the list of available scholarships from dummy JSON data.
    """
    scholarships = load_json_data("scholarships.json")
    body, status = success_response(data=scholarships, message=f"{len(scholarships)} scholarship(s) found")
    return jsonify(body), status


@api.route("/fees", methods=["GET"])
def get_fees():
    """
    GET /api/fees
    Returns the course-wise fee structure from dummy JSON data.
    """
    fees = load_json_data("fees.json")
    body, status = success_response(data=fees, message=f"{len(fees)} fee record(s) found")
    return jsonify(body), status


@api.route("/apply", methods=["POST"])
def submit_application():
    """
    POST /api/apply
    Body:
    {
        "applicant_name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "9876543210",
        "application_type": "course" | "scholarship",
        "reference_id": "cse101",
        "reference_name": "B.Tech Computer Science & Engineering",
        "message": "optional note"
    }

    Submits a student's application for a specific course (admission) or
    scholarship. This is a dummy pipeline: the application is validated,
    given a unique reference ID, and persisted to
    backend/data/applications.json — there's no real review workflow yet,
    but the shape here is ready to swap in a real database/notification
    system later.
    """
    payload = request.get_json(silent=True) or {}

    applicant_name = payload.get("applicant_name", "").strip()
    email = payload.get("email", "").strip()
    phone = payload.get("phone", "").strip()
    application_type = payload.get("application_type", "").strip()
    reference_id = payload.get("reference_id", "").strip()
    reference_name = payload.get("reference_name", "").strip()
    message = payload.get("message", "").strip()

    # Basic validation — every field except `message` is required.
    missing = [
        field
        for field, value in {
            "applicant_name": applicant_name,
            "email": email,
            "phone": phone,
            "application_type": application_type,
            "reference_id": reference_id,
            "reference_name": reference_name,
        }.items()
        if not value
    ]
    if missing:
        body, status = error_response(f"Missing required field(s): {', '.join(missing)}", 400)
        return jsonify(body), status

    if application_type not in ("course", "scholarship"):
        body, status = error_response("application_type must be 'course' or 'scholarship'", 400)
        return jsonify(body), status

    application = Application(
        id=f"APP-{uuid.uuid4().hex[:8].upper()}",
        applicant_name=applicant_name,
        email=email,
        phone=phone,
        application_type=application_type,
        reference_id=reference_id,
        reference_name=reference_name,
        message=message,
    )

    save_application(application.to_dict())

    body, status = success_response(
        data=application.to_dict(),
        message=f"Application submitted successfully! Your reference number is {application.id}.",
        status_code=201,
    )
    return jsonify(body), status


@api.route("/applications", methods=["GET"])
def get_applications():
    """
    GET /api/applications
    Returns every application submitted so far. Useful for an admin view,
    or simply to verify submissions during development/testing.
    """
    applications = load_applications()
    body, status = success_response(data=applications, message=f"{len(applications)} application(s) found")
    return jsonify(body), status


@api.errorhandler(404)
def route_not_found(e):
    body, status = error_response("Endpoint not found", 404)
    return jsonify(body), status


@api.errorhandler(500)
def internal_server_error(e):
    body, status = error_response("Internal server error", 500)
    return jsonify(body), status
