# AI Tooling

This document summarizes the AI-assisted development tools used to build the Café Fausse web application, as required by the project submission guidelines.

## Tools Used

### Cursor (primary IDE)

Cursor was the main development environment for this project. The AI agent was used to:

- Load and interpret the Software Requirements Specification (SRS) PDF to scaffold the full application
- Generate the React front-end (pages, components, routing, and responsive CSS)
- Generate the Flask back-end (REST API, SQLAlchemy models, reservation logic)
- Configure PostgreSQL with a project-local setup script
- Iterate on image paths and project structure based on feedback

### Approach

1. **Planning from requirements** — The SRS was provided as the source of truth. Features were mapped directly to functional requirements (FR-1 through FR-18).
2. **Full-stack scaffolding** — AI generated the initial project structure, then files were reviewed and adjusted for correctness (e.g., PostgreSQL port conflicts, psycopg driver compatibility with Python 3.14).
3. **Incremental refinement** — Follow-up prompts updated image references, database setup, and documentation.

## What Worked Well

- Rapid generation of all five required pages with consistent styling
- Correct mapping of SRS menu items, contact info, hours, awards, and reviews
- Flask + PostgreSQL reservation logic (30 tables, random assignment, availability checks)
- PostgreSQL setup automation when port 5432 was already in use

## What Required Manual Adjustment

- **PostgreSQL authentication** — The initial setup script needed `pg_hba.conf` trust rules for local TCP connections
- **Python 3.14 compatibility** — Switched from `psycopg2-binary` to `psycopg` (v3) due to build errors
- **Port conflicts** — If port 5000 is in use (e.g. macOS AirPlay Receiver), disable AirPlay Receiver in System Settings or run Flask on another port
- **Image assets** — Provided `.webp` files were copied from the course materials into `frontend/public/images/`

## Human Review

All generated code was reviewed for:

- Alignment with SRS functional and non-functional requirements
- Form validation on the client and server
- Database schema matching the required `customers` and `reservations` tables
- Responsive layout using CSS Flexbox and Grid
