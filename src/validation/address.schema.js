import { z } from 'zod';

const fullName = z
  .string()
  .trim()
  .min(2, 'Name is too short')
  .max(25, 'Name must be 25 characters or fewer')
  .regex(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces');
const phone = z
  .string()
  .trim()
  .regex(/^\d{11}$/, 'Enter an 11-digit phone number');

export const addressBodySchema = z.object({
  body: z.object({
    label: z.string().trim().max(50).optional(),
    fullName,
    phone,
    addressLine1: z.string().trim().min(3).max(100),
    addressLine2: z.string().trim().max(100).optional().nullable(),
    city: z.string().trim().min(2).max(100),
    isDefault: z.coerce.boolean().optional(),
  }),
});

export const addressIdParamSchema = z.object({
  params: z.object({ id: z.coerce.number().int().positive() }),
});
