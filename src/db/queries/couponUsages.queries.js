import { pool } from '../../config/db.js';

export async function countUsageByCustomer(couponId, customerId) {
  const [rows] = await pool.query(
    'SELECT COUNT(*) AS count FROM coupon_usages WHERE coupon_id = ? AND customer_id = ?',
    [couponId, customerId],
  );
  return rows[0].count;
}

export async function recordUsage(connection, { couponId, customerId, orderId, discountAmount }) {
  await connection.query(
    'INSERT INTO coupon_usages (coupon_id, customer_id, order_id, discount_amount) VALUES (?, ?, ?, ?)',
    [couponId, customerId, orderId, discountAmount],
  );
}
