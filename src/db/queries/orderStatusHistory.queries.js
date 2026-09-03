import { pool } from '../../config/db.js';

export async function insertStatusHistory(connection, { orderId, status, changedBy, note }) {
  await connection.query(
    'INSERT INTO order_status_history (order_id, status, changed_by, note) VALUES (?, ?, ?, ?)',
    [orderId, status, changedBy, note || null],
  );
}

export async function listHistoryForOrder(orderId) {
  const [rows] = await pool.query(
    'SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC',
    [orderId],
  );
  return rows;
}
