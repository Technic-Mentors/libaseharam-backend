import { z } from 'zod';

export const submitContactMessageSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name is too short')
      .max(25, 'Name must be 25 characters or fewer')
      .regex(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces'),
    email: z.string().trim().email('Enter a valid email').max(150),
    message: z.string().trim().min(1, 'Message is required').max(2000),
  }),
});

export const listContactMessagesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().optional(),
  }),
});

export const contactMessageIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});
