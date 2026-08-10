# Render Deploy — Fix "Failed deploy" for cafefausseaj

Your Render service **cafefausseaj** is failing because Render is trying to run the
**whole repo** instead of the **`backend`** folder where Flask lives.

---

## Option A — Fix existing service (fastest)

1. Open **cafefausseaj** on Render → **Settings**
2. Change these values **exactly**:

| Setting | Value |
|---------|-------|
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Build Command** | `pip install --upgrade pip && pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app --workers 1 --threads 4 --bind 0.0.0.0:$PORT --timeout 120` |
| **Health Check Path** | *(leave empty)* |

3. **Environment** tab — add if missing:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Internal Database URL from **cafe-fausse-db** → Connections |
| `FRONTEND_ORIGINS` | `https://ajanardh.github.io,http://localhost:5173` |

4. **Manual Deploy** → **Deploy latest commit**

---

## Option B — Deploy from repo root (no Root Directory)

If Root Directory is **blank**, use these instead:

| Setting | Value |
|---------|-------|
| **Build Command** | `./build.sh` |
| **Start Command** | `cd backend && gunicorn app:app --workers 1 --threads 4 --bind 0.0.0.0:$PORT --timeout 120` |

(Root `requirements.txt`, `build.sh`, and `Procfile` are included in the repo.)

---

## You MUST have a PostgreSQL database

Without `DATABASE_URL`, reservations fail (health may work).

1. Render → **New +** → **PostgreSQL** → name: `cafe-fausse-db` → Free
2. Copy **Internal Database URL**
3. Paste into Web Service → **Environment** → `DATABASE_URL`

---

## Push latest code first

```bash
cd ~/Projects/cafe-fausse
git add .
git commit -m "Add root Render build files"
git push origin main
```

Then **Manual Deploy** on Render.

---

## Test when status = Live

```
https://cafefausseaj.onrender.com/api/health
```

(or whatever URL Render shows for your service)

Expected: `{"status":"ok"}`

---

## Read the logs

**cafefausseaj** → **Logs** tab. Common errors:

| Log line | Meaning |
|----------|---------|
| `No module named 'app'` | Root Directory must be `backend` |
| `No such file: requirements.txt` | Use Option B build command or set Root Directory |
| `could not connect to server` | Add `DATABASE_URL` |
| `Application failed to respond` | Wrong Start Command |

Copy the last error line if still failing.

---

## Quantic demo (recommended)

Use local backend — always works:

```bash
./scripts/setup-postgres.sh
cd backend && source venv/bin/activate && python app.py
cd frontend && npm run dev
```
