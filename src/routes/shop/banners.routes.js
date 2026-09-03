import { Router } from 'express';
import * as bannersController from '../../controllers/shop/banners.controller.js';
import { validate } from '../../middleware/validate.js';
import { bannerPlacementQuerySchema } from '../../validation/banner.schema.js';

export const bannersRouter = Router();

bannersRouter.get('/', validate(bannerPlacementQuerySchema), bannersController.list);
