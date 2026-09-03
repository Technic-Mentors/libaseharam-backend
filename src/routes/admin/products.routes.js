import { Router } from 'express';
import * as productsController from '../../controllers/admin/products.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { createUploader } from '../../config/upload.js';
import {
  productIdParamSchema,
  createProductSchema,
  updateProductSchema,
  createVariantSchema,
  updateVariantSchema,
} from '../../validation/product.schema.js';

export const productsRouter = Router();
const uploadImage = createUploader('products');

productsRouter.use(requireAdmin);
productsRouter.get('/low-stock', productsController.lowStock);
productsRouter.get('/', productsController.list);
productsRouter.get('/:id', validate(productIdParamSchema), productsController.getOne);
productsRouter.post('/', validate(createProductSchema), productsController.create);
productsRouter.put('/:id', validate(updateProductSchema), productsController.update);
productsRouter.delete('/:id', validate(productIdParamSchema), productsController.remove);

productsRouter.post('/:id/variants', validate(createVariantSchema), productsController.addVariant);
productsRouter.put('/:id/variants/:variantId', validate(updateVariantSchema), productsController.updateVariant);
productsRouter.delete('/:id/variants/:variantId', productsController.removeVariant);

productsRouter.post('/:id/images', uploadImage.single('image'), productsController.uploadImage);
productsRouter.delete('/:id/images/:imageId', productsController.removeImage);
productsRouter.put('/:id/images/:imageId/primary', productsController.makeImagePrimary);
