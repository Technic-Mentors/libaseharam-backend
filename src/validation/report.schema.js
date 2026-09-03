import { z } from 'zod';

export const salesReportQuerySchema = z.object({
  query: z.object({
    dateFrom: z.string().trim().optional(),
    dateTo: z.string().trim().optional(),
    topLimit: z.coerce.number().int().positive().optional(),
    status: z.enum(['placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned']).optional(),
  }),
});

export const exportSalesQuerySchema = z.object({
  query: z.object({
    dateFrom: z.string().trim().optional(),
    dateTo: z.string().trim().optional(),
    status: z.enum(['placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled', 'returned']).optional(),
  }),
});
