import { asyncHandler } from '../../utils/asyncHandler.js';
import * as couponService from '../../services/coupon.service.js';

export const previewCoupon = asyncHandler(async (req, res) => {
  const result = await couponService.previewDiscountForCustomerCart(req.customer.id, req.body.code);
  res.json({ success: true, data: result });
});
