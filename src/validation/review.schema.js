import { z } from 'zod';

export const submitReviewSchema = z.object({
  body: z.object({
    orderItemId: z.coerce.number().int().positive(),
    rating: z.coerce.number().int().min(1).max(5),
    title: z.string().trim().max(150).optional(),
    comment: z.string().trim().max(2000).optional(),
  }),
});

export const adminReviewSchema = z.object({
  body: z.object({
    productId: z.coerce.number().int().positive(),
    rating: z.coerce.number().int().min(1).max(5),
    title: z.string().trim().max(150).optional(),
    comment: z.string().trim().max(2000).optional(),
  }),
});

export const productIdParamSchema = z.object({
  params: z.object({ productId: z.coerce.number().int().positive() }),
});

export const reviewIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});

export const listAdminReviewsQuerySchema = z.object({
  query: z.object({
    status: z.enum(['pending', 'approved', 'rejected']).optional(),
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().optional(),
  }),
});
