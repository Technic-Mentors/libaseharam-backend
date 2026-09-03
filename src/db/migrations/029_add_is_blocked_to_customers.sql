ALTER TABLE customers
  ADD COLUMN is_blocked TINYINT(1) NOT NULL DEFAULT 0 AFTER email_verified_at;
