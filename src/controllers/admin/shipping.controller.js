import { asyncHandler } from '../../utils/asyncHandler.js';
import * as shippingService from '../../services/shipping.service.js';

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await shippingService.getShippingSettings();
  res.json({ success: true, data: settings });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await shippingService.updateShippingSettings(req.body);
  res.json({ success: true, data: settings, message: 'Shipping settings updated.' });
});

export const createZone = asyncHandler(async (req, res) => {
  const zone = await shippingService.createZone(req.body);
  res.status(201).json({ success: true, data: zone, message: 'Shipping zone created.' });
});

export const updateZone = asyncHandler(async (req, res) => {
  const zone = await shippingService.updateZone(Number(req.params.id), req.body);
  res.json({ success: true, data: zone, message: 'Shipping zone updated.' });
});

export const removeZone = asyncHandler(async (req, res) => {
  await shippingService.deleteZone(Number(req.params.id));
  res.json({ success: true, message: 'Shipping zone deleted.' });
});
