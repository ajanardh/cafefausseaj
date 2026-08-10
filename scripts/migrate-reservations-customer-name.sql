-- Add customer_name to reservations for existing databases
ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS customer_name VARCHAR(120);

UPDATE reservations r
SET customer_name = c.name
FROM customers c
WHERE r.customer_id = c.id
  AND r.customer_name IS NULL;

ALTER TABLE reservations
  ALTER COLUMN customer_name SET NOT NULL;
