import { Router } from 'express';
import * as authController from '../../controllers/admin/auth.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { authRateLimiter } from '../../middleware/rateLimiter.js';
import { createUploader } from '../../config/upload.js';
import {
  adminLoginSchema,
  adminForgotPasswordSchema,
  adminResetPasswordSchema,
  adminChangePasswordSchema,
  adminUpdateProfileSchema,
} from '../../validation/adminAuth.schema.js';

export const authRouter = Router();
const uploadAvatar = createUploader('avatars');

authRouter.post('/login', authRateLimiter, validate(adminLoginSchema), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post('/refresh', authController.refresh);
authRouter.get('/me', requireAdmin, authController.me);
authRouter.post(
  '/forgot-password',
  authRateLimiter,
  validate(adminForgotPasswordSchema),
  authController.forgotPassword,
);
authRouter.post(
  '/reset-password',
  authRateLimiter,
  validate(adminResetPasswordSchema),
  authController.resetPassword,
);
authRouter.put(
  '/password',
  requireAdmin,
  validate(adminChangePasswordSchema),
  authController.changePassword,
);
authRouter.put(
  '/profile',
  requireAdmin,
  validate(adminUpdateProfileSchema),
  authController.updateProfile,
);
authRouter.post('/avatar', requireAdmin, uploadAvatar.single('image'), authController.uploadAvatar);
