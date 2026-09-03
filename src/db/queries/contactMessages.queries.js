import { pool } from '../../config/db.js';

export async function insertContactMessage({ name, email, message }) {
  const [result] = await pool.query(
    'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
  );
  return result.insertId;
}

export async function listContactMessages({ limit, offset }) {
  const [rows] = await pool.query(
    'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [limit, offset],
  );
  const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM contact_messages');
  return { rows, total: countRows[0].total };
}

export async function countUnreadContactMessages() {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM contact_messages WHERE is_read = 0');
  return rows[0].count;
}

export async function markContactMessageRead(id) {
  await pool.query('UPDATE contact_messages SET is_read = 1 WHERE id = ?', [id]);
}
