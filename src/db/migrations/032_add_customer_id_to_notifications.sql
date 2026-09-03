ALTER TABLE notifications
  ADD COLUMN customer_id BIGINT UNSIGNED NULL DEFAULT NULL AFTER type,
  ADD INDEX idx_notifications_customer_id (customer_id),
  ADD CONSTRAINT fk_notifications_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
