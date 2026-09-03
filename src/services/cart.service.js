import { AppError } from '../utils/AppError.js';
import * as cartDb from '../db/queries/cartItems.queries.js';
import * as variantsDb from '../db/queries/productVariants.queries.js';

export async function getCart(customerId) {
  return cartDb.listCartItems(customerId);
}

export async function addOrUpdateItem(customerId, variantId, quantity) {
  const variant = await variantsDb.findVariantById(variantId);
  if (!variant) throw new AppError('Product variant not found.', 404);
  if (variant.stock_quantity < quantity) {
    throw new AppError(`Only ${variant.stock_quantity} left in stock.`, 400);
  }
  await cartDb.upsertCartItem(customerId, variantId, quantity);
  return getCart(customerId);
}

export async function removeItem(customerId, variantId) {
  await cartDb.removeCartItem(customerId, variantId);
  return getCart(customerId);
}

/** Merges a guest (browser-local) cart into the customer's persisted cart on login/register. */
export async function mergeGuestCart(customerId, items) {
  const existing = await cartDb.listCartItems(customerId);
  const existingByVariant = new Map(existing.map((item) => [item.variant_id, item.quantity]));

  for (const { variantId, quantity } of items) {
    const variant = await variantsDb.findVariantById(variantId);
    if (!variant) continue;

    const combinedQuantity = Math.min(
      (existingByVariant.get(variantId) || 0) + quantity,
      variant.stock_quantity,
    );
    if (combinedQuantity > 0) {
      await cartDb.upsertCartItem(customerId, variantId, combinedQuantity);
    }
  }

  return getCart(customerId);
}
