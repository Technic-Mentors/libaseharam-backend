import { Router } from 'express';
import * as dashboardController from '../../controllers/admin/dashboard.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';

export const dashboardRouter = Router();

dashboardRouter.get('/', requireAdmin, dashboardController.getDashboard);
