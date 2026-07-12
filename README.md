Github URL: https://github.com/Amulya-2420030434/CollegeAdmissionAgent

# 🎓 College Admission Agent

An AI-powered College Admission Agent — a full-stack web app that helps
students get instant answers about eligibility, courses, hostel, placements,
fees, scholarships, required documents, admission process and important
dates, through a ChatGPT-style chat interface.

Built with **React (Vite) + Tailwind CSS** on the frontend and
**Flask (Python)** on the backend, using a clean REST API. Currently runs
on dummy JSON data with a rule-based chatbot engine, and is architected for
a drop-in **IBM watsonx.ai (Granite)** integration later.

---

## ✨ Features

- Beautiful, responsive landing page (Hero, Features, About, FAQ, Contact)
- ChatGPT-style **Admission Chat** with typing indicator, markdown support,
  suggested questions, auto-scroll and user/AI avatars
- **Course Finder** — search & filter courses by department, click a course for full details and to **Apply Now**
- **Scholarship** explorer with eligibility & deadlines, click a scholarship for full details and to **Apply Now**
- **Fee Structure** — itemized, course-wise fee table
- **FAQ** page
- **Document Upload** page (dummy RAG pipeline placeholder)
- Dark / Light mode toggle
- Fully mobile responsive
- Clean, commented, production-ready code structure

---

## 🧱 Tech Stack

| Layer     | Technology                          |
|-----------|--------------------------------------|
| Frontend  | React.js (Vite), Tailwind CSS, React Router, Axios, react-markdown |
| Backend   | Flask (Python), Flask-CORS           |
| API       | REST (JSON)                          |
| Data      | Dummy JSON (courses, scholarships, fees) |
| Future AI | IBM watsonx.ai (Granite model) — placeholder ready |

---

## 📁 Project Structure

```
college-admission-agent/
├── frontend/                  # React (Vite) + Tailwind app
│   ├── src/
│   │   ├── api/axios.js       # Centralized Axios instance
│   │   ├── components/        # Navbar, Footer, Hero, Sidebar, ChatMessage, etc.
│   │   ├── context/            # ThemeContext (dark/light mode)
│   │   ├── pages/              # Landing, Chat, CourseFinder, Scholarship, Fees, FAQ, Contact, Upload
│   │   ├── App.jsx             # Route definitions
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Tailwind + global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                   # Flask REST API
│   ├── app.py                 # App factory + entry point
│   ├── routes.py              # All /api/* route handlers
│   ├── rag.py                 # RAG placeholder + generate_ibm_response()
│   ├── models.py              # Dataclasses (ChatMessage, Course, etc.)
│   ├── utils.py                # Helpers (data loading, response envelopes)
│   ├── data/                  # Dummy JSON data (courses, scholarships, fees)
│   ├── uploads/                # Uploaded admission PDFs land here
│   └── requirements.txt
│
├── docs/
│   ├── API.md                            # Full API reference
│   └── IBM_WATSONX_INTEGRATION.md        # How to plug in IBM watsonx.ai later
│
├── screenshots/                # Add UI screenshots here
└── README.md
```

---

## 🚀 Getting Started

### 1. Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The API will be running at **http://localhost:5000**.
Try it: `curl http://localhost:5000/api/health`

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

The app will be running at **http://localhost:5173**.
Vite's dev server proxies `/api/*` requests to the Flask backend
automatically (see `vite.config.js`), so no CORS configuration is needed
in development.

### 3. Build for production

```bash
cd frontend
npm run build
```

This outputs static files to `frontend/dist/`, which can be served by any
static host (Netlify, Vercel, Nginx, etc.) or by Flask itself.

---

## 🔌 API Endpoints

| Method | Endpoint             | Description                          |
|--------|-----------------------|---------------------------------------|
| GET    | `/api/health`         | Health check                         |
| POST   | `/api/chat`           | Send a chat message, get AI reply    |
| POST   | `/api/upload`         | Upload an admission PDF               |
| GET    | `/api/courses`        | List all courses                     |
| GET    | `/api/scholarships`   | List all scholarships                |
| GET    | `/api/fees`           | Get course-wise fee structure        |
| POST   | `/api/apply`          | Submit a course/scholarship application |
| GET    | `/api/applications`   | List all submitted applications      |

Full request/response examples: see [`docs/API.md`](docs/API.md).

---

## 🤖 IBM watsonx.ai Integration (Coming Soon)

The chatbot currently uses a fast, rule-based fallback engine
(`generate_fallback_response()` in `backend/rag.py`) so the app is fully
functional today with zero external API dependencies or costs.

`backend/rag.py` also defines `generate_ibm_response()` — a placeholder
function that is the **single integration point** for IBM watsonx.ai's
Granite model. See [`docs/IBM_WATSONX_INTEGRATION.md`](docs/IBM_WATSONX_INTEGRATION.md)
for exact step-by-step instructions.


