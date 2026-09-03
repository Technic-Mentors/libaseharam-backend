import { Router } from 'express';
import * as bannersController from '../../controllers/admin/banners.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { createUploader } from '../../config/upload.js';
import { bannerBodySchema, bannerIdParamSchema, listBannersQuerySchema } from '../../validation/banner.schema.js';

export const bannersRouter = Router();
const uploadImage = createUploader('banners');

bannersRouter.use(requireAdmin);
bannersRouter.get('/', validate(listBannersQuerySchema), bannersController.list);
bannersRouter.post('/', uploadImage.single('image'), validate(bannerBodySchema), bannersController.create);
bannersRouter.put('/:id', validate(bannerBodySchema), bannersController.update);
bannersRouter.delete('/:id', validate(bannerIdParamSchema), bannersController.remove);
