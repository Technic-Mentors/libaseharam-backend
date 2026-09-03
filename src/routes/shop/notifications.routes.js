import { Router } from 'express';
import * as notificationsController from '../../controllers/shop/notifications.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';

export const notificationsRouter = Router();

notificationsRouter.use(requireCustomer);
notificationsRouter.get('/', notificationsController.list);
notificationsRouter.put('/read-all', notificationsController.markAllRead);
notificationsRouter.put('/:id/read', notificationsController.markRead);
