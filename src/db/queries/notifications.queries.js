import { pool } from '../../config/db.js';

export async function createNotification({ type, title, message, link, customerId }) {
  await pool.query(
    'INSERT INTO notifications (type, title, message, link, customer_id) VALUES (?, ?, ?, ?, ?)',
    [type, title, message, link || null, customerId || null],
  );
}

export async function listRecentNotifications(limit = 20) {
  const [rows] = await pool.query(
    'SELECT * FROM notifications WHERE customer_id IS NULL ORDER BY created_at DESC LIMIT ?',
    [limit],
  );
  return rows;
}

export async function countUnread() {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM notifications WHERE customer_id IS NULL AND is_read = 0',
  );
  return rows[0].count;
}

export async function markAllRead() {
  await pool.query('UPDATE notifications SET is_read = 1 WHERE customer_id IS NULL AND is_read = 0');
}

export async function markRead(id) {
  await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ? AND customer_id IS NULL', [id]);
}

export async function listRecentForCustomer(customerId, limit = 20) {
  const [rows] = await pool.query(
    'SELECT * FROM notifications WHERE customer_id = ? ORDER BY created_at DESC LIMIT ?',
    [customerId, limit],
  );
  return rows;
}

export async function countUnreadForCustomer(customerId) {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM notifications WHERE customer_id = ? AND is_read = 0',
    [customerId],
  );
  return rows[0].count;
}

export async function markAllReadForCustomer(customerId) {
  await pool.query('UPDATE notifications SET is_read = 1 WHERE customer_id = ? AND is_read = 0', [customerId]);
}

export async function markReadForCustomer(id, customerId) {
  await pool.query('UPDATE notifications SET is_read = 1 WHERE id = ? AND customer_id = ?', [id, customerId]);
}
