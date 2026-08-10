# Render Deploy Fix Guide

If **cafe-fausse-api** shows **Failed deploy**, follow these steps exactly.

## Step 1 — Delete the failed service

1. Render dashboard → **cafe-fausse-api**
2. **Settings** → scroll down → **Delete Web Service**
3. Confirm delete

(Keep **cafe-fausse-db** PostgreSQL if it exists — do NOT delete the database.)

## Step 2 — Push latest code

```bash
cd ~/Projects/cafe-fausse
git add .
git commit -m "Fix Render deploy configuration"
git push origin main
```

## Step 3 — Create Web Service manually (most reliable)

Do **NOT** use Blueprint if it keeps failing. Create manually:

1. Render → **New +** → **Web Service**
2. Connect **cafefausseaj** repo
3. Settings:

| Setting | Value |
|---------|-------|
| **Name** | `cafe-fausse-api` |
| **Region** | Same as your PostgreSQL database |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | Python 3 |
| **Build Command** | `pip install --upgrade pip && pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app --workers 1 --threads 4 --bind 0.0.0.0:$PORT --timeout 120` |
| **Instance Type** | Free |

4. **Environment Variables** (click Add Environment Variable):

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Paste **Internal Database URL** from your PostgreSQL service |
| `FRONTEND_ORIGINS` | `https://ajanardh.github.io,http://localhost:5173` |

To get Internal Database URL:
- Open **cafe-fausse-db** → **Connections** → copy **Internal Database URL**

5. **Do NOT set a Health Check Path** (leave blank for now)

6. Click **Create Web Service**

## Step 4 — Wait and test

Deploy takes 3–5 minutes. When status shows **Live**:

```
https://cafe-fausse-api.onrender.com/api/health
```

Expected: `{"status":"ok"}`

First request after idle may take 30–60 seconds (free tier wake-up).

## Step 5 — Connect frontend

```bash
VITE_API_URL=https://cafe-fausse-api.onrender.com/api ./scripts/deploy-github-pages.sh
```

## If it fails again

Open **Logs** tab and look for the last red error. Common fixes:

| Error in logs | Fix |
|---------------|-----|
| `No module named 'app'` | Root Directory must be `backend` |
| `could not connect to server` | Set `DATABASE_URL` to Internal Database URL |
| `ModuleNotFoundError: gunicorn` | Re-deploy after pushing latest `requirements.txt` |
| `Exited with status 1` | Check full log — usually missing env var |

## For Quantic presentation

Use **local** backend for reliable demo:

```bash
./scripts/setup-postgres.sh
cd backend && source venv/bin/activate && python app.py
cd frontend && npm run dev
```

Use GitHub Pages site for design, local for reservations + pgAdmin.
