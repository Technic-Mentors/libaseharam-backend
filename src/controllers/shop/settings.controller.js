import { asyncHandler } from '../../utils/asyncHandler.js';
import * as settingsService from '../../services/settings.service.js';

export const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getPublicSettings();
  res.json({ success: true, data: settings });
});
