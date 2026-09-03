import { z } from 'zod';

export const blogPostBodySchema = z.object({
  body: z.object({
    categoryId: z.coerce.number().int().positive().optional().nullable(),
    title: z.string().trim().min(2).max(200),
    excerpt: z.string().trim().max(500).optional().nullable(),
    content: z.string().trim().min(1),
    status: z.enum(['draft', 'published']),
    metaTitle: z.string().trim().max(200).optional().nullable(),
    metaDescription: z.string().trim().max(300).optional().nullable(),
    tags: z.array(z.string().trim().min(1)).optional(),
  }),
});

export const blogCategoryBodySchema = z.object({
  body: z.object({ name: z.string().trim().min(2).max(150) }),
});

export const blogIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});

export const blogSlugParamSchema = z.object({
  params: z.object({ slug: z.string().trim().min(1) }),
});

export const listQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().optional(),
  }),
});
