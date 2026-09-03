import { pool } from '../../config/db.js';

export async function createRefreshToken({ userType, userId, tokenHash, expiresAt }) {
  await pool.query(
    'INSERT INTO refresh_tokens (user_type, user_id, token_hash, expires_at) VALUES (?, ?, ?, ?)',
    [userType, userId, tokenHash, expiresAt],
  );
}

export async function findValidRefreshToken(userType, tokenHash) {
  const [rows] = await pool.query(
    `SELECT * FROM refresh_tokens
     WHERE user_type = ? AND token_hash = ? AND revoked_at IS NULL AND expires_at > NOW()
     LIMIT 1`,
    [userType, tokenHash],
  );
  return rows[0] || null;
}

export async function revokeRefreshToken(id) {
  await pool.query('UPDATE refresh_tokens SET revoked_at = NOW() WHERE id = ?', [id]);
}

export async function revokeRefreshTokenByHash(userType, tokenHash) {
  await pool.query(
    'UPDATE refresh_tokens SET revoked_at = NOW() WHERE user_type = ? AND token_hash = ?',
    [userType, tokenHash],
  );
}
