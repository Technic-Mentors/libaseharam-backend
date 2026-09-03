import { AppError } from '../utils/AppError.js';
import { buildPaginationMeta } from '../utils/pagination.js';
import * as customersDb from '../db/queries/customers.queries.js';
import { listOrdersForCustomer } from '../db/queries/orders.queries.js';
import { listAddressesForCustomer } from '../db/queries/addresses.queries.js';

export async function listCustomers({ search, page, pageSize }) {
  const offset = (page - 1) * pageSize;
  const { rows, total } = await customersDb.listCustomersAdmin({ search, limit: pageSize, offset });
  return { rows, meta: buildPaginationMeta({ page, pageSize, total }) };
}

export async function getCustomerProfile(id) {
  const customer = await customersDb.findCustomerById(id);
  if (!customer) throw new AppError('Customer not found.', 404);

  const [orders, addresses] = await Promise.all([listOrdersForCustomer(id), listAddressesForCustomer(id)]);
  return { ...customer, orders, addresses };
}

export async function setBlocked(id, isBlocked) {
  const customer = await customersDb.findCustomerById(id);
  if (!customer) throw new AppError('Customer not found.', 404);
  await customersDb.setCustomerBlocked(id, isBlocked);
  return customersDb.findCustomerById(id);
}
