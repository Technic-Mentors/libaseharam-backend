import { asyncHandler } from '../../utils/asyncHandler.js';
import * as contactService from '../../services/contact.service.js';

export const list = asyncHandler(async (req, res) => {
  const { rows, meta } = await contactService.listMessagesAdmin(req.query);
  res.json({ success: true, data: rows, meta });
});

export const markRead = asyncHandler(async (req, res) => {
  await contactService.markMessageRead(Number(req.params.id));
  res.json({ success: true, message: 'Message marked as read.' });
});
