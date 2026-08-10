#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PGDATA="$ROOT_DIR/postgres-data"
PGPORT=5433
PGUSER=cafe_fausse
PGDATABASE=cafe_fausse
ENV_FILE="$ROOT_DIR/backend/.env"
LOG_FILE="$PGDATA/logfile"

configure_hba() {
  cat > "$PGDATA/pg_hba.conf" <<'EOF'
# Café Fausse local development — trust auth on localhost only
local   all             all                                     trust
host    all             all             127.0.0.1/32            trust
host    all             all             ::1/128                 trust
EOF
}

if ! command -v initdb >/dev/null 2>&1; then
  echo "PostgreSQL tools not found. Install with: brew install postgresql@18"
  exit 1
fi

if [ ! -f "$PGDATA/PG_VERSION" ]; then
  echo "Initializing PostgreSQL data directory at postgres-data/ ..."
  initdb -D "$PGDATA" -U "$PGUSER" --auth-local=trust --auth-host=trust
  echo "port = $PGPORT" >> "$PGDATA/postgresql.conf"
  echo "listen_addresses = 'localhost'" >> "$PGDATA/postgresql.conf"
  configure_hba
else
  configure_hba
fi

if ! pg_isready -h 127.0.0.1 -p "$PGPORT" >/dev/null 2>&1; then
  echo "Starting PostgreSQL on port $PGPORT ..."
  pg_ctl -D "$PGDATA" -l "$LOG_FILE" start
  for _ in $(seq 1 20); do
    if pg_isready -h 127.0.0.1 -p "$PGPORT" >/dev/null 2>&1; then
      break
    fi
    sleep 0.5
  done
fi

if ! pg_isready -h 127.0.0.1 -p "$PGPORT" >/dev/null 2>&1; then
  echo "PostgreSQL failed to start. Check $LOG_FILE"
  exit 1
fi

# Reload pg_hba after any config changes
pg_ctl -D "$PGDATA" reload >/dev/null 2>&1 || true

psql -h 127.0.0.1 -p "$PGPORT" -U "$PGUSER" -d postgres -tc \
  "SELECT 1 FROM pg_database WHERE datname = '$PGDATABASE'" | grep -q 1 \
  || createdb -h 127.0.0.1 -p "$PGPORT" -U "$PGUSER" "$PGDATABASE"

cat > "$ENV_FILE" <<EOF
DATABASE_URL=postgresql+psycopg://${PGUSER}@127.0.0.1:${PGPORT}/${PGDATABASE}
PGHOST=127.0.0.1
PGPORT=${PGPORT}
PGUSER=${PGUSER}
PGDATABASE=${PGDATABASE}
EOF

echo "PostgreSQL is ready."
echo "  Host: 127.0.0.1"
echo "  Port: $PGPORT"
echo "  Database: $PGDATABASE"
echo "  User: $PGUSER"
echo "  Config: backend/.env"

if [ -d "$ROOT_DIR/backend/venv" ]; then
  echo "Creating application tables ..."
  (
    cd "$ROOT_DIR/backend"
    # shellcheck disable=SC1091
    source venv/bin/activate
    python -c "from app import app, db; 
with app.app_context():
    db.create_all()
    print('Tables created: customers, reservations')"
  )
fi

echo "Done."
