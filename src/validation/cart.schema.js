import { z } from 'zod';

export const addCartItemSchema = z.object({
  body: z.object({
    variantId: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().positive().max(20),
  }),
});

export const removeCartItemSchema = z.object({
  params: z.object({ variantId: z.coerce.number().int().positive() }),
});

export const mergeCartSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        variantId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().positive().max(20),
      }),
    ),
  }),
});

export const wishlistProductSchema = z.object({
  params: z.object({ productId: z.coerce.number().int().positive() }),
});

export const notifyMeSchema = z.object({
  body: z.object({
    variantId: z.coerce.number().int().positive(),
    email: z.string().trim().toLowerCase().email(),
  }),
});
