import { Router } from 'express';
import * as blogController from '../../controllers/shop/blog.controller.js';
import { validate } from '../../middleware/validate.js';
import { blogSlugParamSchema, listQuerySchema } from '../../validation/blog.schema.js';

export const blogRouter = Router();

blogRouter.get('/categories', blogController.listCategories);
blogRouter.get('/', validate(listQuerySchema), blogController.listPosts);
blogRouter.get('/:slug', validate(blogSlugParamSchema), blogController.getPost);
