import { pool } from '../../config/db.js';

export async function createPasswordResetToken({ userType, userId, tokenHash, expiresAt }) {
  await pool.query(
    'INSERT INTO password_reset_tokens (user_type, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)',
    [userType, userId, tokenHash, expiresAt],
  );
}

export async function findValidPasswordResetToken(userType, tokenHash) {
  const [rows] = await pool.query(
    `SELECT * FROM password_reset_tokens
     WHERE user_type = ? AND token_hash = ? AND used_at IS NULL AND expires_at > NOW()
     LIMIT 1`,
    [userType, tokenHash],
  );
  return rows[0] || null;
}

export async function markPasswordResetTokenUsed(id) {
  await pool.query('UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?', [id]);
}
