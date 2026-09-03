import { Router } from 'express';
import * as ordersController from '../../controllers/shop/orders.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';
import { validate } from '../../middleware/validate.js';
import { orderRateLimiter } from '../../middleware/rateLimiter.js';
import { checkoutSchema, orderIdParamSchema, cancelOrderSchema } from '../../validation/order.schema.js';

export const ordersRouter = Router();

ordersRouter.use(requireCustomer);
ordersRouter.get('/', ordersController.listMyOrders);
ordersRouter.get('/:id', validate(orderIdParamSchema), ordersController.getMyOrder);
ordersRouter.post('/', orderRateLimiter, validate(checkoutSchema), ordersController.checkout);
ordersRouter.post('/:id/cancel', validate(cancelOrderSchema), ordersController.cancelMyOrder);
