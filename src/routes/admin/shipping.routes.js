import { Router } from 'express';
import * as shippingController from '../../controllers/admin/shipping.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import {
  shippingSettingsSchema,
  shippingZoneBodySchema,
  shippingZoneIdParamSchema,
  updateShippingZoneSchema,
} from '../../validation/shipping.schema.js';

export const shippingRouter = Router();

shippingRouter.use(requireAdmin);
shippingRouter.get('/', shippingController.getSettings);
shippingRouter.put('/', validate(shippingSettingsSchema), shippingController.updateSettings);
shippingRouter.post('/zones', validate(shippingZoneBodySchema), shippingController.createZone);
shippingRouter.put('/zones/:id', validate(updateShippingZoneSchema), shippingController.updateZone);
shippingRouter.delete('/zones/:id', validate(shippingZoneIdParamSchema), shippingController.removeZone);
