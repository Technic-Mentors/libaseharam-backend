import { asyncHandler } from '../../utils/asyncHandler.js';
import * as addressService from '../../services/address.service.js';

export const list = asyncHandler(async (req, res) => {
  const addresses = await addressService.listAddresses(req.customer.id);
  res.json({ success: true, data: addresses });
});

export const create = asyncHandler(async (req, res) => {
  const address = await addressService.createAddress(req.customer.id, req.body);
  res.status(201).json({ success: true, data: address, message: 'Address saved.' });
});

export const update = asyncHandler(async (req, res) => {
  const address = await addressService.updateAddress(Number(req.params.id), req.customer.id, req.body);
  res.json({ success: true, data: address, message: 'Address updated.' });
});

export const remove = asyncHandler(async (req, res) => {
  await addressService.deleteAddress(Number(req.params.id), req.customer.id);
  res.json({ success: true, message: 'Address deleted.' });
});

export const setDefault = asyncHandler(async (req, res) => {
  const address = await addressService.setDefaultAddress(Number(req.params.id), req.customer.id);
  res.json({ success: true, data: address, message: 'Default address updated.' });
});
