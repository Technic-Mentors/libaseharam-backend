import { Router } from 'express';
import * as catalogController from '../../controllers/shop/catalog.controller.js';
import { validate } from '../../middleware/validate.js';
import { listProductsQuerySchema, productSlugParamSchema } from '../../validation/product.schema.js';

export const catalogRouter = Router();

catalogRouter.get('/categories', catalogController.listCategories);
catalogRouter.get('/products', validate(listProductsQuerySchema), catalogController.listProducts);
catalogRouter.get('/products/featured', catalogController.listFeaturedProducts);
catalogRouter.get('/products/:slug', validate(productSlugParamSchema), catalogController.getProductBySlug);
