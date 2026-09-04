import { pool } from '../../config/db.js';

export async function listApprovedForProduct(productId) {
  const [rows] = await pool.query(
    `SELECT r.*, COALESCE(c.name, 'Anonymous Customer') AS customer_name FROM reviews r
     LEFT JOIN customers c ON c.id = r.customer_id
     WHERE r.product_id = ? AND r.status = 'approved'
     ORDER BY r.created_at DESC`,
    [productId],
  );
  return rows;
}

export async function getProductRatingSummary(productId) {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS count, COALESCE(AVG(rating), 0) AS average
     FROM reviews WHERE product_id = ? AND status = 'approved'`,
    [productId],
  );
  return { count: rows[0].count, average: Number(rows[0].average) };
}

export async function listAdminReviews({ status, limit, offset }) {
  const where = status ? 'WHERE r.status = ?' : '';
  const params = status ? [status] : [];

  const [rows] = await pool.query(
    `SELECT r.*, COALESCE(c.name, CONCAT('Added by admin: ', a.name)) AS customer_name,
        p.name AS product_name, p.slug AS product_slug
     FROM reviews r
     LEFT JOIN customers c ON c.id = r.customer_id
     LEFT JOIN admins a ON a.id = r.admin_id
     JOIN products p ON p.id = r.product_id
     ${where}
     ORDER BY r.created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset],
  );

  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM reviews r ${where}`, params);
  return { rows, total: countRows[0].total };
}

export async function countPending() {
  const [rows] = await pool.query("SELECT COUNT(*) AS count FROM reviews WHERE status = 'pending'");
  return rows[0].count;
}

export async function findReviewById(id) {
  const [rows] = await pool.query('SELECT * FROM reviews WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function findReviewByOrderItem(orderItemId) {
  const [rows] = await pool.query('SELECT * FROM reviews WHERE order_item_id = ? LIMIT 1', [orderItemId]);
  return rows[0] || null;
}

export async function createReview({ productId, customerId, orderItemId, rating, title, comment }) {
  const [result] = await pool.query(
    `INSERT INTO reviews (product_id, customer_id, order_item_id, rating, title, comment)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [productId, customerId, orderItemId, rating, title || null, comment || null],
  );
  return result.insertId;
}

export async function createAdminReview({ productId, adminId, rating, title, comment }) {
  const [result] = await pool.query(
    `INSERT INTO reviews (product_id, admin_id, rating, title, comment, status)
     VALUES (?, ?, ?, ?, ?, 'approved')`,
    [productId, adminId, rating, title || null, comment || null],
  );
  return result.insertId;
}

export async function updateReviewStatus(id, status) {
  await pool.query('UPDATE reviews SET status = ? WHERE id = ?', [status, id]);
}

export async function deleteReview(id) {
  await pool.query('DELETE FROM reviews WHERE id = ?', [id]);
}
