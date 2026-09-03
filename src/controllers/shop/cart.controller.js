import { asyncHandler } from '../../utils/asyncHandler.js';
import * as cartService from '../../services/cart.service.js';

export const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.customer.id);
  res.json({ success: true, data: cart });
});

export const addItem = asyncHandler(async (req, res) => {
  const cart = await cartService.addOrUpdateItem(req.customer.id, req.body.variantId, req.body.quantity);
  res.json({ success: true, data: cart, message: 'Cart updated.' });
});

export const removeItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeItem(req.customer.id, Number(req.params.variantId));
  res.json({ success: true, data: cart, message: 'Item removed from cart.' });
});

export const mergeCart = asyncHandler(async (req, res) => {
  const cart = await cartService.mergeGuestCart(req.customer.id, req.body.items);
  res.json({ success: true, data: cart, message: 'Cart merged.' });
});
