import { Router } from 'express';
import * as contactMessagesController from '../../controllers/admin/contactMessages.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { listContactMessagesQuerySchema, contactMessageIdParamSchema } from '../../validation/contact.schema.js';

export const contactMessagesRouter = Router();

contactMessagesRouter.use(requireAdmin);
contactMessagesRouter.get('/', validate(listContactMessagesQuerySchema), contactMessagesController.list);
contactMessagesRouter.put('/:id/read', validate(contactMessageIdParamSchema), contactMessagesController.markRead);
