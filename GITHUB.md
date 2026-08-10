# GitHub Deployment for ajanardh/cafefausseaj

Your live URL will be: **https://ajanardh.github.io/cafefausseaj/**

**Render deploy failing?** See [RENDER.md](RENDER.md) for step-by-step fix.

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

1. Push latest code to **`main`** on GitHub
2. Render → **New → Blueprint** → repo `cafefausseaj` → branch **`main`** → **Apply**

**If Blueprint fails, create manually:**

**Step 1 — PostgreSQL database**
- Render → **New → PostgreSQL** → name: `cafe-fausse-db` → free → **Create**
- Copy the **Internal Database URL**

**Step 2 — Web service**
- Render → **New → Web Service** → repo `cafefausseaj`, branch **`main`**
- **Root Directory:** `backend`
- **Runtime:** Python 3
- **Build Command:** `pip install --upgrade pip && pip install -r requirements.txt`
- **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT --timeout 120`
- **Environment variables:**
  - `DATABASE_URL` = Internal Database URL from Step 1
  - `FRONTEND_ORIGINS` = `https://ajanardh.github.io,http://localhost:5173`
- **Health Check Path:** `/api/health`
- Click **Create Web Service**

**Common deploy failures:**
| Error | Fix |
|-------|-----|
| `render.yaml not found on gh-pages` | Use branch **`main`**, not `gh-pages` |
| Build failed | Root Directory must be **`backend`** |
| Deploy failed / worker exited | Add **`DATABASE_URL`** env var linked to PostgreSQL |
| DB connection error | Use **Internal** Database URL, not External |

3. Test: `https://cafe-fausse-api.onrender.com/api/health` → `{"status":"ok"}`

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
