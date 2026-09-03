import { Router } from 'express';
import * as reviewsController from '../../controllers/shop/reviews.controller.js';
import { requireCustomer } from '../../middleware/auth.customer.js';
import { validate } from '../../middleware/validate.js';
import { submitReviewSchema, productIdParamSchema } from '../../validation/review.schema.js';

export const reviewsRouter = Router();

reviewsRouter.get('/product/:productId', validate(productIdParamSchema), reviewsController.getForProduct);
reviewsRouter.get('/reviewable', requireCustomer, reviewsController.listReviewable);
reviewsRouter.post('/', requireCustomer, validate(submitReviewSchema), reviewsController.submit);
