import { Router } from 'express';
import * as couponsController from '../../controllers/admin/coupons.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { couponBodySchema, couponIdParamSchema, listCouponsQuerySchema } from '../../validation/coupon.schema.js';

export const couponsRouter = Router();

couponsRouter.use(requireAdmin);
couponsRouter.get('/', validate(listCouponsQuerySchema), couponsController.list);
couponsRouter.get('/:id', validate(couponIdParamSchema), couponsController.getOne);
couponsRouter.post('/', validate(couponBodySchema), couponsController.create);
couponsRouter.put('/:id', validate(couponBodySchema), couponsController.update);
couponsRouter.delete('/:id', validate(couponIdParamSchema), couponsController.remove);
