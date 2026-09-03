import { Router } from 'express';
import * as notificationsController from '../../controllers/admin/notifications.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';

export const notificationsRouter = Router();

notificationsRouter.use(requireAdmin);
notificationsRouter.get('/', notificationsController.list);
notificationsRouter.put('/read-all', notificationsController.markAllRead);
notificationsRouter.put('/:id/read', notificationsController.markRead);
