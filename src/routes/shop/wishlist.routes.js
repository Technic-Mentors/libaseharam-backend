import { Router } from 'express';
import * as wishlistController from '../../controllers/shop/wishlist.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';
import { attachCustomerIfPresent } from '../../middleware/auth.customer.js';
import { validate } from '../../middleware/validate.js';
import { wishlistProductSchema, notifyMeSchema } from '../../validation/cart.schema.js';

export const wishlistRouter = Router();

wishlistRouter.get('/', requireCustomer, wishlistController.getWishlist);
wishlistRouter.post('/:productId', requireCustomer, validate(wishlistProductSchema), wishlistController.addToWishlist);
wishlistRouter.delete(
  '/:productId',
  requireCustomer,
  validate(wishlistProductSchema),
  wishlistController.removeFromWishlist,
);

export const notifyMeRouter = Router();
notifyMeRouter.post('/', attachCustomerIfPresent, validate(notifyMeSchema), wishlistController.notifyMe);
