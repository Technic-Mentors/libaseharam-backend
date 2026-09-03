import { pool } from '../../config/db.js';

export async function insertOrderItem(connection, item) {
  const [result] = await connection.query(
    `INSERT INTO order_items
       (order_id, product_id, product_variant_id, product_name, size, color, sku, unit_price, quantity, line_total)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      item.orderId,
      item.productId,
      item.variantId,
      item.productName,
      item.size,
      item.color,
      item.sku,
      item.unitPrice,
      item.quantity,
      item.lineTotal,
    ],
  );
  return result.insertId;
}

export async function listItemsForOrder(orderId) {
  const [rows] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [orderId]);
  return rows;
}

export async function findOrderItemById(id) {
  const [rows] = await pool.query('SELECT * FROM order_items WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function findDeliveredUnreviewedItemsForCustomer(customerId) {
  const [rows] = await pool.query(
    `SELECT oi.*, o.status, o.created_at AS ordered_at
     FROM order_items oi
     JOIN orders o ON o.id = oi.order_id
     LEFT JOIN reviews r ON r.order_item_id = oi.id
     WHERE o.customer_id = ? AND o.status = 'delivered' AND r.id IS NULL`,
    [customerId],
  );
  return rows;
}
