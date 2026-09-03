import { Router } from 'express';
import * as couponsController from '../../controllers/shop/coupons.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';
import { validate } from '../../middleware/validate.js';
import { previewCouponSchema } from '../../validation/coupon.schema.js';

export const couponsRouter = Router();

couponsRouter.post('/preview', requireCustomer, validate(previewCouponSchema), couponsController.previewCoupon);
