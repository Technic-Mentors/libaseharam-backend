import { z } from 'zod';

export const createCategorySchema = z.object({
  body: z.object({
    parentId: z.coerce.number().int().positive().optional().nullable(),
    name: z.string().trim().min(2).max(150),
    description: z.string().trim().max(2000).optional().nullable(),
    sortOrder: z.coerce.number().int().optional(),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
  body: z.object({
    parentId: z.coerce.number().int().positive().optional().nullable(),
    name: z.string().trim().min(2).max(150),
    description: z.string().trim().max(2000).optional().nullable(),
    sortOrder: z.coerce.number().int().optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});
