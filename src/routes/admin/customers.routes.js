import { Router } from 'express';
import * as customersController from '../../controllers/admin/customers.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { listCustomersQuerySchema, customerIdParamSchema, setBlockedSchema } from '../../validation/customer.schema.js';

export const customersRouter = Router();

customersRouter.use(requireAdmin);
customersRouter.get('/', validate(listCustomersQuerySchema), customersController.list);
customersRouter.get('/:id', validate(customerIdParamSchema), customersController.getOne);
customersRouter.put('/:id/block', validate(setBlockedSchema), customersController.setBlocked);
