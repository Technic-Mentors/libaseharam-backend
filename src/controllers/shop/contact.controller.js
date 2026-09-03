import { asyncHandler } from '../../utils/asyncHandler.js';
import * as contactService from '../../services/contact.service.js';

export const submit = asyncHandler(async (req, res) => {
  await contactService.submitMessage(req.body);
  res.status(201).json({ success: true, message: "Thanks! We'll be in touch soon." });
});
