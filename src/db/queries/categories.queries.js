import { pool } from '../../config/db.js';

export async function listCategories({ activeOnly = false } = {}) {
  const where = activeOnly ? 'WHERE is_active = 1' : '';
  const [rows] = await pool.query(
    `SELECT * FROM categories ${where} ORDER BY sort_order ASC, name ASC`,
  );
  return rows;
}

export async function findCategoryById(id) {
  const [rows] = await pool.query('SELECT * FROM categories WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function findCategoryBySlug(slug) {
  const [rows] = await pool.query('SELECT * FROM categories WHERE slug = ? LIMIT 1', [slug]);
  return rows[0] || null;
}

export async function createCategory({ parentId, name, slug, description, bannerImage, sortOrder }) {
  const [result] = await pool.query(
    `INSERT INTO categories (parent_id, name, slug, description, banner_image, sort_order)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [parentId || null, name, slug, description || null, bannerImage || null, sortOrder ?? 0],
  );
  return result.insertId;
}

export async function updateCategory(id, { parentId, name, slug, description, bannerImage, sortOrder, isActive }) {
  await pool.query(
    `UPDATE categories SET
       parent_id = ?, name = ?, slug = ?, description = ?, banner_image = ?, sort_order = ?, is_active = ?
     WHERE id = ?`,
    [parentId || null, name, slug, description || null, bannerImage || null, sortOrder ?? 0, isActive ? 1 : 0, id],
  );
}

export async function updateCategoryBanner(id, bannerImage) {
  await pool.query('UPDATE categories SET banner_image = ? WHERE id = ?', [bannerImage, id]);
}

export async function deleteCategory(id) {
  await pool.query('DELETE FROM categories WHERE id = ?', [id]);
}

export async function countProductsInCategory(id) {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM products WHERE category_id = ?', [id]);
  return rows[0].count;
}

export async function countSubcategories(id) {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM categories WHERE parent_id = ?', [id]);
  return rows[0].count;
}
