"""
app.py
------
Entry point for the College Admission Agent backend.

Responsibilities:
  - Create and configure the Flask app
  - Enable CORS so the React (Vite) frontend on a different port can call
    the API during local development
  - Register the API blueprint from routes.py
  - Provide a root endpoint for a quick sanity check

Run locally with:
    python app.py

The server starts on http://localhost:5000 by default.
Frontend (Vite) runs on http://localhost:5173 and is pre-configured to
call this backend — see frontend/src/api/axios.js.
"""

import os
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from routes import api

# Load environment variables from a .env file if present.
# This is where IBM_WATSONX_API_KEY / IBM_WATSONX_PROJECT_ID etc. will live
# once IBM watsonx.ai is integrated (see rag.py for details).
load_dotenv()


def create_app():
    """Application factory — makes testing and future scaling easier."""
    app = Flask(__name__)

    # Allow requests from the Vite dev server (and any other origin during
    # development). In production, restrict this to your real domain.
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register all /api/* routes defined in routes.py
    app.register_blueprint(api, url_prefix="/api")

    @app.route("/", methods=["GET"])
    def index():
        """Root endpoint — quick way to confirm the server is alive."""
        return jsonify(
            {
                "project": "College Admission Agent",
                "status": "running",
                "docs": "See /api/health for a full health check, or README.md for API documentation.",
            }
        )

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    # debug=True enables auto-reload during development — turn off in production.
    app.run(host="0.0.0.0", port=port, debug=True)
