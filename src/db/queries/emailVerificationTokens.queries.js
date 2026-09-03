import { pool } from '../../config/db.js';

export async function createEmailVerificationToken({ customerId, tokenHash, expiresAt }) {
  await pool.query(
    'INSERT INTO email_verification_tokens (customer_id, token_hash, expires_at) VALUES (?, ?, ?)',
    [customerId, tokenHash, expiresAt],
  );
}

/** Looks up a token by hash as long as it hasn't expired, regardless of whether it was already used
 *  (the caller decides what to do with an already-verified token — see verifyEmail service). */
export async function findEmailVerificationTokenByHash(tokenHash) {
  const [rows] = await pool.query(
    `SELECT * FROM email_verification_tokens
     WHERE token_hash = ? AND expires_at > NOW()
     LIMIT 1`,
    [tokenHash],
  );
  return rows[0] || null;
}

export async function markEmailVerificationTokenUsed(id) {
  await pool.query('UPDATE email_verification_tokens SET verified_at = NOW() WHERE id = ?', [id]);
}
