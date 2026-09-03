import { pool } from '../../config/db.js';

export async function listCategories() {
  const [rows] = await pool.query('SELECT * FROM blog_categories ORDER BY name ASC');
  return rows;
}

export async function createCategory(name, slug) {
  const [result] = await pool.query('INSERT INTO blog_categories (name, slug) VALUES (?, ?)', [name, slug]);
  return result.insertId;
}

export async function findTagsByNames(names) {
  if (names.length === 0) return [];
  const [rows] = await pool.query(`SELECT * FROM blog_tags WHERE name IN (?)`, [names]);
  return rows;
}

export async function createTag(name, slug) {
  const [result] = await pool.query('INSERT INTO blog_tags (name, slug) VALUES (?, ?)', [name, slug]);
  return result.insertId;
}

export async function setPostTags(postId, tagIds) {
  await pool.query('DELETE FROM blog_post_tags WHERE blog_post_id = ?', [postId]);
  for (const tagId of tagIds) {
    await pool.query('INSERT INTO blog_post_tags (blog_post_id, tag_id) VALUES (?, ?)', [postId, tagId]);
  }
}

export async function listTagsForPost(postId) {
  const [rows] = await pool.query(
    `SELECT t.* FROM blog_tags t
     JOIN blog_post_tags pt ON pt.tag_id = t.id
     WHERE pt.blog_post_id = ?`,
    [postId],
  );
  return rows;
}

const POST_SELECT = `
  SELECT p.*, c.name AS category_name, c.slug AS category_slug
  FROM blog_posts p LEFT JOIN blog_categories c ON c.id = p.category_id
`;

export async function listPublishedPosts({ limit, offset }) {
  const [rows] = await pool.query(
    `${POST_SELECT} WHERE p.status = 'published' ORDER BY p.published_at DESC LIMIT ? OFFSET ?`,
    [limit, offset],
  );
  const [countRows] = await pool.query("SELECT COUNT(*) AS total FROM blog_posts WHERE status = 'published'");
  return { rows, total: countRows[0].total };
}

export async function findPublishedPostBySlug(slug) {
  const [rows] = await pool.query(`${POST_SELECT} WHERE p.slug = ? AND p.status = 'published' LIMIT 1`, [slug]);
  return rows[0] || null;
}

export async function listAdminPosts({ limit, offset }) {
  const [rows] = await pool.query(`${POST_SELECT} ORDER BY p.created_at DESC LIMIT ? OFFSET ?`, [limit, offset]);
  const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM blog_posts');
  return { rows, total: countRows[0].total };
}

export async function findPostById(id) {
  const [rows] = await pool.query(`${POST_SELECT} WHERE p.id = ? LIMIT 1`, [id]);
  return rows[0] || null;
}

export async function createPost(data) {
  const [result] = await pool.query(
    `INSERT INTO blog_posts (category_id, title, slug, excerpt, content, featured_image, status, published_at, meta_title, meta_description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.categoryId || null,
      data.title,
      data.slug,
      data.excerpt || null,
      data.content,
      data.featuredImage || null,
      data.status,
      data.status === 'published' ? new Date() : null,
      data.metaTitle || null,
      data.metaDescription || null,
    ],
  );
  return result.insertId;
}

export async function updatePost(id, data, wasPublished) {
  const publishedAt = !wasPublished && data.status === 'published' ? new Date() : undefined;
  await pool.query(
    `UPDATE blog_posts SET
       category_id = ?, title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, status = ?,
       meta_title = ?, meta_description = ? ${publishedAt ? ', published_at = ?' : ''}
     WHERE id = ?`,
    [
      data.categoryId || null,
      data.title,
      data.slug,
      data.excerpt || null,
      data.content,
      data.featuredImage || null,
      data.status,
      data.metaTitle || null,
      data.metaDescription || null,
      ...(publishedAt ? [publishedAt] : []),
      id,
    ],
  );
}

export async function deletePost(id) {
  await pool.query('DELETE FROM blog_posts WHERE id = ?', [id]);
}

export async function updateFeaturedImage(id, imagePath) {
  await pool.query('UPDATE blog_posts SET featured_image = ? WHERE id = ?', [imagePath, id]);
}
