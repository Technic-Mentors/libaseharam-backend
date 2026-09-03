import { Router } from 'express';
import * as reviewsController from '../../controllers/admin/reviews.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { reviewIdParamSchema, listAdminReviewsQuerySchema } from '../../validation/review.schema.js';

export const reviewsRouter = Router();

reviewsRouter.use(requireAdmin);
reviewsRouter.get('/', validate(listAdminReviewsQuerySchema), reviewsController.list);
reviewsRouter.put('/:id/approve', validate(reviewIdParamSchema), reviewsController.approve);
reviewsRouter.put('/:id/reject', validate(reviewIdParamSchema), reviewsController.reject);
reviewsRouter.delete('/:id', validate(reviewIdParamSchema), reviewsController.remove);
