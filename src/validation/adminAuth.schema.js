import { z } from 'zod';

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email('Enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const adminForgotPasswordSchema = z.object({
  body: z.object({ email: z.string().trim().toLowerCase().email() }),
});

export const adminResetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export const adminChangePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

export const adminUpdateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name is too short')
      .max(25, 'Name must be 25 characters or fewer')
      .regex(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces'),
    email: z.string().trim().toLowerCase().email('Enter a valid email address'),
  }),
});
