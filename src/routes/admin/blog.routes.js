import { Router } from 'express';
import * as blogController from '../../controllers/admin/blog.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { createUploader } from '../../config/upload.js';
import {
  blogPostBodySchema,
  blogCategoryBodySchema,
  blogIdParamSchema,
  listQuerySchema,
} from '../../validation/blog.schema.js';

export const blogRouter = Router();
const uploadImage = createUploader('blog');

blogRouter.use(requireAdmin);
blogRouter.get('/categories', blogController.listCategories);
blogRouter.post('/categories', validate(blogCategoryBodySchema), blogController.createCategory);
blogRouter.get('/posts', validate(listQuerySchema), blogController.list);
blogRouter.get('/posts/:id', validate(blogIdParamSchema), blogController.getOne);
blogRouter.post('/posts', validate(blogPostBodySchema), blogController.create);
blogRouter.put('/posts/:id', validate(blogPostBodySchema), blogController.update);
blogRouter.delete('/posts/:id', validate(blogIdParamSchema), blogController.remove);
blogRouter.post('/posts/:id/image', uploadImage.single('image'), blogController.uploadFeaturedImage);
