#!/usr/bin/env bash
# Display database contents for demo/presentation (shows reservation & newsletter effects)
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PGPORT="${PGPORT:-5433}"
PGUSER="${PGUSER:-cafe_fausse}"
PGDATABASE="${PGDATABASE:-cafe_fausse}"

echo "=== customers ==="
psql -h 127.0.0.1 -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c \
  "SELECT id AS customer_id, name AS customer_name, email AS customer_email, phone AS phone_number, newsletter_signup FROM customers ORDER BY id;"

echo ""
echo "=== reservations ==="
psql -h 127.0.0.1 -p "$PGPORT" -U "$PGUSER" -d "$PGDATABASE" -c \
  "SELECT id AS reservation_id, customer_id, customer_name, time_slot, table_number FROM reservations ORDER BY id;"
