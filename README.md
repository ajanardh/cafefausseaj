# Café Fausse

A responsive full-stack web application for the Café Fausse fine-dining restaurant. Built to meet the Software Requirements Specification (SRS) and Web Application & Interface Design project requirements.

**Deploy to GitHub:** see [GITHUB.md](GITHUB.md) for GitHub Pages setup and push instructions.

## Solution Overview

| Requirement | Implementation |
| ----------- | -------------- |
| 5 pages (React + JSX) | Home, Menu, Reservations, About Us, Gallery |
| Contact info & hours | Home page + footer (SRS FR-1–FR-4) |
| Menu by category | Menu page with all SRS items and prices (FR-5) |
| Reservations form | Date/time, guests, name, email, optional phone (FR-6–FR-9) |
| About Us | History, mission, founder biographies (FR-10–FR-11) |
| Gallery + lightbox | Provided images, awards, reviews (FR-12–FR-14) |
| Newsletter signup | Footer form with email validation, stored in DB (FR-15–FR-16) |
| Flask + PostgreSQL | REST API, `customers` & `reservations` tables (FR-17–FR-18) |
| Responsive CSS | Flexbox and Grid throughout |

## Design

The site uses a fine-dining aesthetic: dark green background, gold accents, and Cormorant Garamond display typography. Layouts use **CSS Grid** for page sections and card layouts, and **Flexbox** for navigation, forms, and menu rows. The design is responsive across desktop, tablet, and mobile (collapsible nav menu below 768px).

Images are sourced from the course-provided assets in `frontend/public/images/`.

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Front-end | React 18, JSX, React Router, Vite   |
| Styling   | CSS Flexbox & Grid (responsive)     |
| Back-end  | Flask, Flask-CORS, SQLAlchemy       |
| Database  | PostgreSQL                          |

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL client tools (`initdb`, `pg_ctl`, `psql`) — `brew install postgresql@18`

## Local Setup

### 1. PostgreSQL

```bash
chmod +x scripts/*.sh
./scripts/setup-postgres.sh
```

This starts PostgreSQL on **port 5433**, creates the `cafe_fausse` database, writes `backend/.env`, and creates tables.

### 2. Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

API: http://localhost:5001

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Site: http://localhost:5173

## Demo Presentation

For your recorded presentation, demonstrate:

1. All five pages and navigation
2. Newsletter signup (footer on any page)
3. Making a reservation (including fully-booked error if all 30 tables taken)
4. **Database state** — run in a terminal after form submissions:

```bash
./scripts/show-db.sh
```

This prints `customers` and `reservations` rows with SRS field names, showing newsletter signups and reservation records.

## API Endpoints

| Method | Endpoint                           | Description              |
| ------ | ---------------------------------- | ------------------------ |
| GET    | `/api/health`                      | Health check             |
| GET    | `/api/reservations/availability`   | Check table availability |
| POST   | `/api/reservations`                | Create a reservation     |
| POST   | `/api/newsletter`                  | Subscribe to newsletter  |

## Database Schema

**customers** — Customer ID, Customer Name, Customer Email, Phone Number, Newsletter Signup

**reservations** — Reservation ID, Customer ID, Customer Name, Time Slot, Table Number

The back-end assigns a random available table (1–30) per time slot and prevents overbooking via a unique constraint on `(time_slot, table_number)`.

## Additional Files

- [ai-tooling.md](ai-tooling.md) — AI tools used in development (required for submission)
- [staging.md](staging.md) — Deployment note (local only)

## Project Structure

```
cafe-fausse/
├── ai-tooling.md
├── staging.md
├── backend/
├── frontend/
│   └── public/images/    # Course-provided .webp assets
├── scripts/
│   ├── setup-postgres.sh
│   ├── stop-postgres.sh
│   └── show-db.sh        # Demo: view DB after form submissions
└── README.md
```
