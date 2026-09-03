import { asyncHandler } from '../../utils/asyncHandler.js';
import * as settingsService from '../../services/settings.service.js';

export const getAll = asyncHandler(async (req, res) => {
  const settings = await settingsService.getAllSettings();
  res.json({ success: true, data: settings });
});

export const update = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);
  res.json({ success: true, data: settings, message: 'Settings updated.' });
});
