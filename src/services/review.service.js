import { AppError } from '../utils/AppError.js';
import { buildPaginationMeta } from '../utils/pagination.js';
import * as reviewsDb from '../db/queries/reviews.queries.js';
import { findOrderItemById, findDeliveredUnreviewedItemsForCustomer } from '../db/queries/orderItems.queries.js';
import { findOrderById } from '../db/queries/orders.queries.js';

export async function getProductReviews(productId) {
  const [reviews, summary] = await Promise.all([
    reviewsDb.listApprovedForProduct(productId),
    reviewsDb.getProductRatingSummary(productId),
  ]);
  return { reviews, summary };
}

export async function listReviewableOrderItems(customerId) {
  return findDeliveredUnreviewedItemsForCustomer(customerId);
}

export async function submitReview(customerId, { orderItemId, rating, title, comment }) {
  const orderItem = await findOrderItemById(orderItemId);
  if (!orderItem) throw new AppError('Order item not found.', 404);

  const order = await findOrderById(orderItem.order_id);
  if (!order || order.customer_id !== customerId) throw new AppError('Order item not found.', 404);
  if (order.status !== 'delivered') {
    throw new AppError('You can only review items from delivered orders.', 400);
  }

  const existing = await reviewsDb.findReviewByOrderItem(orderItemId);
  if (existing) throw new AppError('You have already reviewed this item.', 409);

  const id = await reviewsDb.createReview({
    productId: orderItem.product_id,
    customerId,
    orderItemId,
    rating,
    title,
    comment,
  });
  return reviewsDb.findReviewById(id);
}

export async function listAdminReviews({ status, page, pageSize }) {
  const offset = (page - 1) * pageSize;
  const { rows, total } = await reviewsDb.listAdminReviews({ status, limit: pageSize, offset });
  return { rows, meta: buildPaginationMeta({ page, pageSize, total }) };
}

async function getReviewOrThrow(id) {
  const review = await reviewsDb.findReviewById(id);
  if (!review) throw new AppError('Review not found.', 404);
  return review;
}

export async function approveReview(id) {
  await getReviewOrThrow(id);
  await reviewsDb.updateReviewStatus(id, 'approved');
  return reviewsDb.findReviewById(id);
}

export async function rejectReview(id) {
  await getReviewOrThrow(id);
  await reviewsDb.updateReviewStatus(id, 'rejected');
  return reviewsDb.findReviewById(id);
}

export async function deleteReview(id) {
  await getReviewOrThrow(id);
  await reviewsDb.deleteReview(id);
}
