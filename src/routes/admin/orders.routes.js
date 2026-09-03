import { Router } from 'express';
import * as ordersController from '../../controllers/admin/orders.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { orderIdParamSchema, updateOrderStatusSchema, listOrdersAdminQuerySchema } from '../../validation/order.schema.js';

export const ordersRouter = Router();

ordersRouter.use(requireAdmin);
ordersRouter.get('/', validate(listOrdersAdminQuerySchema), ordersController.list);
ordersRouter.get('/:id', validate(orderIdParamSchema), ordersController.getOne);
ordersRouter.put('/:id/status', validate(updateOrderStatusSchema), ordersController.updateStatus);
