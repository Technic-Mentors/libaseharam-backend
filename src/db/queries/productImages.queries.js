import { pool } from '../../config/db.js';

export async function listImagesForProduct(productId) {
  const [rows] = await pool.query(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC',
    [productId],
  );
  return rows;
}

export async function addProductImage({ productId, variantId, imagePath, sortOrder = 0, isPrimary = false }) {
  const [result] = await pool.query(
    'INSERT INTO product_images (product_id, variant_id, image_path, sort_order, is_primary) VALUES (?, ?, ?, ?, ?)',
    [productId, variantId || null, imagePath, sortOrder, isPrimary ? 1 : 0],
  );
  return result.insertId;
}

export async function findImageById(id) {
  const [rows] = await pool.query('SELECT * FROM product_images WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function deleteImage(id) {
  await pool.query('DELETE FROM product_images WHERE id = ?', [id]);
}

export async function clearPrimaryForProduct(productId) {
  await pool.query('UPDATE product_images SET is_primary = 0 WHERE product_id = ?', [productId]);
}

export async function setPrimaryImage(id) {
  await pool.query('UPDATE product_images SET is_primary = 1 WHERE id = ?', [id]);
}
