import { asyncHandler } from '../../utils/asyncHandler.js';
import * as orderService from '../../services/order.service.js';

export const list = asyncHandler(async (req, res) => {
  const { status, search, dateFrom, dateTo, page = 1, pageSize = 20 } = req.query;
  const { rows, meta } = await orderService.listOrdersAdmin({
    status,
    search,
    dateFrom,
    dateTo,
    page: Number(page),
    pageSize: Number(pageSize),
  });
  res.json({ success: true, data: rows, meta });
});

export const getOne = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderAdmin(Number(req.params.id));
  res.json({ success: true, data: order });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatusAdmin(
    Number(req.params.id),
    req.body.status,
    req.body.note,
    req.admin.id,
  );
  res.json({ success: true, data: order, message: `Order marked as ${req.body.status}.` });
});
