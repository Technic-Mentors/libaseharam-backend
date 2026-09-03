import { asyncHandler } from '../../utils/asyncHandler.js';
import * as reviewService from '../../services/review.service.js';

export const getForProduct = asyncHandler(async (req, res) => {
  const result = await reviewService.getProductReviews(Number(req.params.productId));
  res.json({ success: true, data: result });
});

export const listReviewable = asyncHandler(async (req, res) => {
  const items = await reviewService.listReviewableOrderItems(req.customer.id);
  res.json({ success: true, data: items });
});

export const submit = asyncHandler(async (req, res) => {
  const review = await reviewService.submitReview(req.customer.id, req.body);
  res.status(201).json({ success: true, data: review, message: 'Review submitted for approval.' });
});
