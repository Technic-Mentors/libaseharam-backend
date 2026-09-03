import { pool } from '../../config/db.js';

export async function findAdminByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM admins WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

export async function findAdminById(id) {
  const [rows] = await pool.query('SELECT id, name, email, avatar, created_at FROM admins WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

/** Includes password_hash — for internal auth checks only, never return this row to a client. */
export async function findAdminAuthById(id) {
  const [rows] = await pool.query('SELECT * FROM admins WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function updateAdminPassword(id, passwordHash) {
  await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [passwordHash, id]);
}

export async function updateAdminProfile(id, { name, email }) {
  await pool.query('UPDATE admins SET name = ?, email = ? WHERE id = ?', [name, email, id]);
}

export async function updateAdminAvatar(id, avatarPath) {
  await pool.query('UPDATE admins SET avatar = ? WHERE id = ?', [avatarPath, id]);
}
