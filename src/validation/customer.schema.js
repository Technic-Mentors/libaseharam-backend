import { z } from 'zod';

export const listCustomersQuerySchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().optional(),
  }),
});

export const customerIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});

export const setBlockedSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: z.object({ isBlocked: z.coerce.boolean() }),
});
