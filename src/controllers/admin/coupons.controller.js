import { asyncHandler } from '../../utils/asyncHandler.js';
import * as couponService from '../../services/coupon.service.js';

export const list = asyncHandler(async (req, res) => {
  const { page, pageSize } = req.query;
  const { rows, meta } = await couponService.listCoupons({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
  });
  res.json({ success: true, data: rows, meta });
});

export const getOne = asyncHandler(async (req, res) => {
  const coupon = await couponService.getCoupon(Number(req.params.id));
  res.json({ success: true, data: coupon });
});

export const create = asyncHandler(async (req, res) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(201).json({ success: true, data: coupon, message: 'Coupon created.' });
});

export const update = asyncHandler(async (req, res) => {
  const coupon = await couponService.updateCoupon(Number(req.params.id), req.body);
  res.json({ success: true, data: coupon, message: 'Coupon updated.' });
});

export const remove = asyncHandler(async (req, res) => {
  await couponService.deleteCoupon(Number(req.params.id));
  res.json({ success: true, message: 'Coupon deleted.' });
});
