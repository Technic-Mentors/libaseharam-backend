import * as settingsDb from '../db/queries/settings.queries.js';

const PUBLIC_KEYS = [
  'store_name',
  'store_email',
  'store_phone',
  'store_address',
  'return_window_days',
  'return_policy_text',
];

export async function getAllSettings() {
  return settingsDb.getAllSettings();
}

export async function getPublicSettings() {
  const all = await settingsDb.getAllSettings();
  return Object.fromEntries(PUBLIC_KEYS.map((key) => [key, all[key] ?? null]));
}

export async function updateSettings(entries) {
  await settingsDb.setSettings(entries);
  return getAllSettings();
}
