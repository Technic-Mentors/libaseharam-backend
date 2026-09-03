import { Router } from 'express';
import * as addressesController from '../../controllers/shop/addresses.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';
import { validate } from '../../middleware/validate.js';
import { addressBodySchema, addressIdParamSchema } from '../../validation/address.schema.js';

export const addressesRouter = Router();

addressesRouter.use(requireCustomer);
addressesRouter.get('/', addressesController.list);
addressesRouter.post('/', validate(addressBodySchema), addressesController.create);
addressesRouter.put('/:id', validate(addressBodySchema), addressesController.update);
addressesRouter.delete('/:id', validate(addressIdParamSchema), addressesController.remove);
addressesRouter.put('/:id/default', validate(addressIdParamSchema), addressesController.setDefault);
