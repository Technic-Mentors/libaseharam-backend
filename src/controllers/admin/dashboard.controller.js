import { asyncHandler } from '../../utils/asyncHandler.js';
import * as dashboardService from '../../services/dashboard.service.js';

export const getDashboard = asyncHandler(async (req, res) => {
  const { trendDays, topLimit } = req.query;
  const data = await dashboardService.getDashboard({
    trendDays: trendDays ? Number(trendDays) : undefined,
    topLimit: topLimit ? Number(topLimit) : undefined,
  });
  res.json({ success: true, data });
});
