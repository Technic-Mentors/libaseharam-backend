import { AppError } from '../utils/AppError.js';
import * as notifyMeDb from '../db/queries/notifyMeRequests.queries.js';
import * as variantsDb from '../db/queries/productVariants.queries.js';

export async function requestNotification({ customerId, variantId, email }) {
  const variant = await variantsDb.findVariantById(variantId);
  if (!variant) throw new AppError('Product variant not found.', 404);
  if (variant.stock_quantity > 0) throw new AppError('This item is currently in stock.', 400);

  await notifyMeDb.createNotifyMeRequest({ customerId, variantId, email });
}
