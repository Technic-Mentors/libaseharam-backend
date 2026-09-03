import { asyncHandler } from '../../utils/asyncHandler.js';
import * as wishlistService from '../../services/wishlist.service.js';
import * as notifyMeService from '../../services/notifyMe.service.js';

export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.getWishlist(req.customer.id);
  res.json({ success: true, data: wishlist });
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.addToWishlist(req.customer.id, Number(req.params.productId));
  res.json({ success: true, data: wishlist, message: 'Added to wishlist.' });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const wishlist = await wishlistService.removeFromWishlist(req.customer.id, Number(req.params.productId));
  res.json({ success: true, data: wishlist, message: 'Removed from wishlist.' });
});

export const notifyMe = asyncHandler(async (req, res) => {
  await notifyMeService.requestNotification({
    customerId: req.customer?.id || null,
    variantId: req.body.variantId,
    email: req.body.email,
  });
  res.json({ success: true, message: "We'll email you when this is back in stock." });
});
