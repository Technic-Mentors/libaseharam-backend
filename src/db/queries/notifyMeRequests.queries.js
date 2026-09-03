import { pool } from '../../config/db.js';

export async function createNotifyMeRequest({ customerId, variantId, email }) {
  await pool.query(
    'INSERT INTO notify_me_requests (customer_id, product_variant_id, email) VALUES (?, ?, ?)',
    [customerId || null, variantId, email],
  );
}

export async function listUnnotifiedForVariant(variantId) {
  const [rows] = await pool.query(
    'SELECT * FROM notify_me_requests WHERE product_variant_id = ? AND notified_at IS NULL',
    [variantId],
  );
  return rows;
}

export async function markNotified(id) {
  await pool.query('UPDATE notify_me_requests SET notified_at = NOW() WHERE id = ?', [id]);
}
