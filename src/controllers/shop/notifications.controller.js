import { asyncHandler } from '../../utils/asyncHandler.js';
import * as notificationService from '../../services/notification.service.js';

export const list = asyncHandler(async (req, res) => {
  const data = await notificationService.listRecentForCustomer(req.customer.id);
  res.json({ success: true, data });
});

export const markAllRead = asyncHandler(async (req, res) => {
  await notificationService.markAllReadForCustomer(req.customer.id);
  res.json({ success: true, message: 'All notifications marked as read.' });
});

export const markRead = asyncHandler(async (req, res) => {
  await notificationService.markReadForCustomer(Number(req.params.id), req.customer.id);
  res.json({ success: true, message: 'Notification marked as read.' });
});
