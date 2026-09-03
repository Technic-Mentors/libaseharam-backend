import { Router } from 'express';
import * as settingsController from '../../controllers/admin/settings.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { updateSettingsSchema } from '../../validation/settings.schema.js';

export const settingsRouter = Router();

settingsRouter.use(requireAdmin);
settingsRouter.get('/', settingsController.getAll);
settingsRouter.put('/', validate(updateSettingsSchema), settingsController.update);
