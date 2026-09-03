import { asyncHandler } from '../../utils/asyncHandler.js';
import * as customerService from '../../services/customer.service.js';

export const list = asyncHandler(async (req, res) => {
  const { search, page = 1, pageSize = 20 } = req.query;
  const { rows, meta } = await customerService.listCustomers({ search, page: Number(page), pageSize: Number(pageSize) });
  res.json({ success: true, data: rows, meta });
});

export const getOne = asyncHandler(async (req, res) => {
  const customer = await customerService.getCustomerProfile(Number(req.params.id));
  res.json({ success: true, data: customer });
});

export const setBlocked = asyncHandler(async (req, res) => {
  const customer = await customerService.setBlocked(Number(req.params.id), req.body.isBlocked);
  res.json({ success: true, data: customer, message: req.body.isBlocked ? 'Customer blocked.' : 'Customer unblocked.' });
});
