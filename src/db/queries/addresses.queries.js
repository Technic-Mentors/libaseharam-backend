import { pool } from '../../config/db.js';

export async function listAddressesForCustomer(customerId) {
  const [rows] = await pool.query(
    'SELECT * FROM addresses WHERE customer_id = ? ORDER BY is_default DESC, created_at DESC',
    [customerId],
  );
  return rows;
}

export async function findAddressById(id, customerId) {
  const [rows] = await pool.query('SELECT * FROM addresses WHERE id = ? AND customer_id = ? LIMIT 1', [
    id,
    customerId,
  ]);
  return rows[0] || null;
}

export async function createAddress(customerId, data) {
  const [result] = await pool.query(
    `INSERT INTO addresses (customer_id, label, full_name, phone, address_line1, address_line2, city, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      customerId,
      data.label || 'Home',
      data.fullName,
      data.phone,
      data.addressLine1,
      data.addressLine2 || null,
      data.city,
      data.isDefault ? 1 : 0,
    ],
  );
  return result.insertId;
}

export async function updateAddress(id, customerId, data) {
  await pool.query(
    `UPDATE addresses SET label = ?, full_name = ?, phone = ?, address_line1 = ?, address_line2 = ?, city = ?
     WHERE id = ? AND customer_id = ?`,
    [data.label || 'Home', data.fullName, data.phone, data.addressLine1, data.addressLine2 || null, data.city, id, customerId],
  );
}

export async function deleteAddress(id, customerId) {
  await pool.query('DELETE FROM addresses WHERE id = ? AND customer_id = ?', [id, customerId]);
}

export async function clearDefaultForCustomer(customerId) {
  await pool.query('UPDATE addresses SET is_default = 0 WHERE customer_id = ?', [customerId]);
}

export async function setDefaultAddress(id, customerId) {
  await pool.query('UPDATE addresses SET is_default = 1 WHERE id = ? AND customer_id = ?', [id, customerId]);
}
