# Café Fausse

A responsive full-stack web application for the Café Fausse fine-dining restaurant. Built per the project SRS with a React front-end, Flask back-end, and PostgreSQL database.

## Features

- **Home** — Restaurant name, contact info, hours, and navigation
- **Menu** — Full menu by category with descriptions and prices
- **Reservations** — Table booking with availability checks and automatic table assignment (30 tables)
- **About Us** — Restaurant history, mission, and founder profiles
- **Gallery** — Image gallery with lightbox, awards, and customer reviews
- **Newsletter** — Email signup with validation, stored in the database

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Front-end | React 18, JSX, React Router, Vite |
| Styling  | CSS Flexbox & Grid (responsive)     |
| Back-end | Flask, Flask-CORS, SQLAlchemy       |
| Database | PostgreSQL                          |

## Prerequisites

- Node.js 18+
- Python 3.10+
- Docker (for PostgreSQL) or a local PostgreSQL installation

## Local Setup

### 1. Start PostgreSQL

Using Docker (recommended):

```bash
docker compose up -d
```

Or configure your own PostgreSQL instance and update `DATABASE_URL` in `backend/.env`.

Copy the example env file:

```bash
cp backend/.env.example backend/.env
```

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

The Flask API runs at `http://localhost:5000`.

### 3. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The React app runs at `http://localhost:5173` and proxies API requests to Flask.

## API Endpoints

| Method | Endpoint                         | Description                    |
| ------ | -------------------------------- | ------------------------------ |
| GET    | `/api/health`                    | Health check                   |
| GET    | `/api/reservations/availability` | Check table availability       |
| POST   | `/api/reservations`              | Create a reservation           |
| POST   | `/api/newsletter`                | Subscribe to newsletter        |

### Reservation request body

```json
{
  "time_slot": "2026-08-01T19:00:00",
  "guest_count": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "2025551234"
}
```

## Database Schema

**customers**
- `id`, `name`, `email`, `phone`, `newsletter_signup`, `created_at`

**reservations**
- `id`, `customer_id`, `time_slot`, `table_number`, `created_at`

Tables are created automatically on first run via SQLAlchemy.

## Production Build

```bash
cd frontend
npm run build
```

Serve the `frontend/dist` folder with any static file server and deploy the Flask app behind a WSGI server (e.g. Gunicorn).

## Project Structure

```
cafe-fausse/
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── models.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── data/
│   │   └── pages/
│   └── package.json
├── docker-compose.yml
└── README.md
```
