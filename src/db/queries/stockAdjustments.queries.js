import { pool } from '../../config/db.js';

export async function recordAdjustment({ variantId, adminId, changeQuantity, reason }) {
  await pool.query(
    'INSERT INTO stock_adjustments (product_variant_id, admin_id, change_quantity, reason) VALUES (?, ?, ?, ?)',
    [variantId, adminId, changeQuantity, reason],
  );
}

export async function listAdjustmentsForVariant(variantId) {
  const [rows] = await pool.query(
    `SELECT sa.*, a.name AS admin_name FROM stock_adjustments sa
     JOIN admins a ON a.id = sa.admin_id
     WHERE sa.product_variant_id = ? ORDER BY sa.created_at DESC`,
    [variantId],
  );
  return rows;
}
