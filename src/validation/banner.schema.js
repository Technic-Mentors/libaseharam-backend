import { z } from 'zod';

export const bannerBodySchema = z.object({
  body: z.object({
    title: z.string().trim().min(1).max(150),
    linkUrl: z.string().trim().max(255).optional().nullable(),
    placement: z.string().trim().max(50).optional(),
    sortOrder: z.coerce.number().int().optional(),
    isActive: z
      .union([z.boolean(), z.enum(['true', 'false'])])
      .optional()
      .transform((value) => (value === undefined ? undefined : value === true || value === 'true')),
    startsAt: z.string().trim().optional().nullable(),
    endsAt: z.string().trim().optional().nullable(),
  }),
});

export const bannerIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});

export const bannerPlacementQuerySchema = z.object({
  query: z.object({ placement: z.string().trim().min(1) }),
});

export const listBannersQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().optional(),
  }),
});
