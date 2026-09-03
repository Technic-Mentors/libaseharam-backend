import { asyncHandler } from '../../utils/asyncHandler.js';
import * as bannerService from '../../services/banner.service.js';

export const list = asyncHandler(async (req, res) => {
  const banners = await bannerService.listActiveByPlacement(req.query.placement);
  res.json({ success: true, data: banners });
});
