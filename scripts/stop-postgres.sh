#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PGDATA="$ROOT_DIR/postgres-data"
PGPORT=5433

if [ -f "$PGDATA/postmaster.pid" ]; then
  pg_ctl -D "$PGDATA" stop || true
fi

echo "PostgreSQL stopped (port $PGPORT)."
