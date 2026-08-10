# GitHub Deployment for ajanardh/cafefausseaj

Your live URL will be: **https://ajanardh.github.io/cafefausseaj/**

---

## Method 1: Deploy from a branch (easiest — recommended)

You will **not** see "Deploy to GitHub Pages" in Actions until the workflow file is on GitHub. This method uses **Settings → Pages** instead.

### Step 1 — Push your source code

```bash
cd ~/Projects/cafe-fausse
git checkout -B main
git add .
git commit -m "Café Fausse website"
git remote add origin https://github.com/ajanardh/cafefausseaj.git
git push -u origin main
```

(If `origin` already exists, skip the `remote add` line.)

### Step 2 — Build and deploy

```bash
chmod +x scripts/deploy-github-pages.sh
./scripts/deploy-github-pages.sh
```

Enter your GitHub username/password or token when prompted.

### Step 3 — Turn on Pages in GitHub

1. Open: https://github.com/ajanardh/cafefausseaj/settings/pages
2. **Build and deployment → Source:** choose **Deploy from a branch**
3. **Branch:** `gh-pages`  **Folder:** `/ (root)`
4. Click **Save**

Wait 1–2 minutes, then visit: https://ajanardh.github.io/cafefausseaj/

---

## Method 2: GitHub Actions (after pushing main)

Only appears **after** you push the repo (including `.github/workflows/deploy-pages.yml`).

1. Push code to `main` (Step 1 above)
2. Open: https://github.com/ajanardh/cafefausseaj/settings/pages
3. **Source:** select **GitHub Actions** (not "Deploy from a branch")
4. Go to **Actions** tab → **Deploy to GitHub Pages** → **Run workflow**

---

## Why you saw 404

- The repo on GitHub is empty or missing the built site
- GitHub Pages was never enabled
- Wrong URL — use `/cafefausseaj/` not `/CafeFausse_Website/`

---

## Reservations on the live site

GitHub Pages hosts the **front-end only**. To make reservations and newsletter work:

### A. Deploy the backend (free on Render)

1. Push your code to GitHub (including `render.yaml`)
2. Go to [render.com](https://render.com) → **Sign up** (free) → **New → Blueprint**
3. Connect your `cafefausseaj` repo — Render reads `render.yaml` automatically
4. Click **Apply** — creates a Flask API + PostgreSQL database
5. Wait for deploy to finish (~5 min). Copy your API URL, e.g.:
   ```
   https://cafe-fausse-api.onrender.com
   ```

Test it: open `https://cafe-fausse-api.onrender.com/api/health` — should show `{"status":"ok"}`

> **Note:** Free Render services spin down after inactivity. First request may take ~30 seconds.

### B. Redeploy the front-end with the API URL

```bash
cd ~/Projects/cafe-fausse
VITE_API_URL=https://cafe-fausse-api.onrender.com/api ./scripts/deploy-github-pages.sh
```

Replace the URL with your actual Render service URL + `/api`.

Wait 1–2 minutes, then test reservations at https://ajanardh.github.io/cafefausseaj/

### For your Quantic demo

Running locally still works for showing database changes:

```bash
./scripts/setup-postgres.sh
cd backend && source venv/bin/activate && python app.py
cd frontend && npm run dev
```
