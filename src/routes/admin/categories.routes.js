import { Router } from 'express';
import * as categoriesController from '../../controllers/admin/categories.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { createUploader } from '../../config/upload.js';
import { createCategorySchema, updateCategorySchema, categoryIdParamSchema } from '../../validation/category.schema.js';

export const categoriesRouter = Router();
const uploadBanner = createUploader('categories');

categoriesRouter.use(requireAdmin);
categoriesRouter.get('/', categoriesController.list);
categoriesRouter.get('/:id', validate(categoryIdParamSchema), categoriesController.getOne);
categoriesRouter.post('/', validate(createCategorySchema), categoriesController.create);
categoriesRouter.put('/:id', validate(updateCategorySchema), categoriesController.update);
categoriesRouter.delete('/:id', validate(categoryIdParamSchema), categoriesController.remove);
categoriesRouter.post(
  '/:id/banner',
  validate(categoryIdParamSchema),
  uploadBanner.single('image'),
  categoriesController.uploadBanner,
);
