ALTER TABLE order_status_history ADD COLUMN actor_name VARCHAR(150) NULL DEFAULT NULL AFTER changed_by;
