import { asyncHandler } from '../../utils/asyncHandler.js';
import * as reportService from '../../services/report.service.js';

export const getSalesReport = asyncHandler(async (req, res) => {
  const { dateFrom, dateTo, topLimit, status } = req.query;
  const data = await reportService.getSalesReport({ dateFrom, dateTo, topLimit, status });
  res.json({ success: true, data });
});

export const exportSalesCsv = asyncHandler(async (req, res) => {
  const { dateFrom, dateTo, status } = req.query;
  const csv = await reportService.exportSalesCsv({ dateFrom, dateTo, status });

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="sales-report-${Date.now()}.csv"`);
  res.send(csv);
});
