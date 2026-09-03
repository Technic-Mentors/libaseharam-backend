import { Router } from 'express';
import * as cartController from '../../controllers/shop/cart.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';
import { validate } from '../../middleware/validate.js';
import { addCartItemSchema, removeCartItemSchema, mergeCartSchema } from '../../validation/cart.schema.js';

export const cartRouter = Router();

cartRouter.use(requireCustomer);
cartRouter.get('/', cartController.getCart);
cartRouter.post('/items', validate(addCartItemSchema), cartController.addItem);
cartRouter.delete('/items/:variantId', validate(removeCartItemSchema), cartController.removeItem);
cartRouter.post('/merge', validate(mergeCartSchema), cartController.mergeCart);
