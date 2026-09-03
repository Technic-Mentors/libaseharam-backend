import { Router } from 'express';
import * as reportsController from '../../controllers/admin/reports.controller.js';
import { requireAdmin } from '../../middleware/auth.admin.js';
import { validate } from '../../middleware/validate.js';
import { salesReportQuerySchema, exportSalesQuerySchema } from '../../validation/report.schema.js';

export const reportsRouter = Router();

reportsRouter.use(requireAdmin);
reportsRouter.get('/sales', validate(salesReportQuerySchema), reportsController.getSalesReport);
reportsRouter.get('/sales/export', validate(exportSalesQuerySchema), reportsController.exportSalesCsv);
