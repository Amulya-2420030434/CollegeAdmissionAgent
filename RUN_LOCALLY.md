# Run It Locally — No Build Tools Needed (VS Code "Live Server" style)

This project ships with a **pre-built, ready-to-run frontend** in
`frontend/dist/`. You do NOT need to run `npm install` or `npm run build`
to try it out — just start the backend and open the pre-built site.

## Step 1 — Start the backend (Flask API)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Leave this running. It serves the API at **http://localhost:5000**.

## Step 2 — Open the pre-built frontend

You have two easy options:

### Option A — VS Code "Live Server" extension (recommended)
1. Open the `frontend/dist` folder in VS Code.
2. Right-click `index.html` → **"Open with Live Server"**.
3. Your browser opens the site (usually at `http://127.0.0.1:5500`).

### Option B — Any static server
```bash
cd frontend/dist
python -m http.server 5500
```
Then open **http://localhost:5500** in your browser.

That's it — the site is already configured to talk to the backend at
`http://localhost:5000/api` (baked in via `frontend/.env` →
`VITE_API_BASE_URL`), so as long as Step 1's server is running, the
Admission Chat, Course Finder, Scholarship, and Fee Structure pages will
all load real data.

---

## Notes

- **Navigation:** click through the site using its own links/buttons
  (Sidebar, Navbar, "Start Admission Chat", etc). Because this is a
  single-page app, a manual browser refresh on an inner page (e.g.
  `/chat`) may 404 on a plain static server — always start from `/` or
  use in-app navigation. Live Server's built-in reload works fine as long
  as you don't hard-refresh on a deep link.
- **Changing the backend URL:** if you deploy the Flask API somewhere
  other than `localhost:5000`, edit `frontend/.env`'s
  `VITE_API_BASE_URL`, then re-run `npm run build` to regenerate
  `frontend/dist/` with the new URL baked in.
- **Want live-reloading React development instead?** Use the normal dev
  workflow described in the main `README.md` (`npm install && npm run dev`),
  which also proxies API calls automatically.
