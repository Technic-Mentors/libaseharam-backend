import { asyncHandler } from '../../utils/asyncHandler.js';
import * as reviewService from '../../services/review.service.js';

export const list = asyncHandler(async (req, res) => {
  const { status, page = 1, pageSize = 20 } = req.query;
  const { rows, meta } = await reviewService.listAdminReviews({ status, page: Number(page), pageSize: Number(pageSize) });
  res.json({ success: true, data: rows, meta });
});

export const create = asyncHandler(async (req, res) => {
  const review = await reviewService.submitAdminReview(req.admin.id, req.body);
  res.status(201).json({ success: true, data: review, message: 'Review added.' });
});

export const approve = asyncHandler(async (req, res) => {
  const review = await reviewService.approveReview(Number(req.params.id));
  res.json({ success: true, data: review, message: 'Review approved.' });
});

export const reject = asyncHandler(async (req, res) => {
  const review = await reviewService.rejectReview(Number(req.params.id));
  res.json({ success: true, data: review, message: 'Review rejected.' });
});

export const remove = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(Number(req.params.id));
  res.json({ success: true, message: 'Review deleted.' });
});
