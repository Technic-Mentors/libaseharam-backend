import { Router } from 'express';
import * as contactController from '../../controllers/shop/contact.controller.js';
import { validate } from '../../middleware/validate.js';
import { authRateLimiter } from '../../middleware/rateLimiter.js';
import { submitContactMessageSchema } from '../../validation/contact.schema.js';

export const contactRouter = Router();

contactRouter.post('/', authRateLimiter, validate(submitContactMessageSchema), contactController.submit);
