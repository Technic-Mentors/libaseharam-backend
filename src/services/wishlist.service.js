import * as wishlistDb from '../db/queries/wishlists.queries.js';

export async function getWishlist(customerId) {
  return wishlistDb.listWishlist(customerId);
}

export async function addToWishlist(customerId, productId) {
  await wishlistDb.addToWishlist(customerId, productId);
  return getWishlist(customerId);
}

export async function removeFromWishlist(customerId, productId) {
  await wishlistDb.removeFromWishlist(customerId, productId);
  return getWishlist(customerId);
}
