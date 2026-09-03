import { z } from 'zod';

export const updateSettingsSchema = z.object({
  body: z.record(z.string().max(2000, 'Value is too long')),
});
