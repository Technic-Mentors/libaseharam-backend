import { pool } from '../../config/db.js';

export async function getAllSettings() {
  const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings');
  return Object.fromEntries(rows.map((row) => [row.setting_key, row.setting_value]));
}

export async function getSetting(key) {
  const [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = ? LIMIT 1', [key]);
  return rows[0]?.setting_value ?? null;
}

export async function setSetting(key, value) {
  await pool.query(
    `INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [key, value],
  );
}

export async function setSettings(entries) {
  for (const [key, value] of Object.entries(entries)) {
    await setSetting(key, value);
  }
}
