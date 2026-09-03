import { AppError } from '../utils/AppError.js';
import * as addressesDb from '../db/queries/addresses.queries.js';

export async function listAddresses(customerId) {
  return addressesDb.listAddressesForCustomer(customerId);
}

export async function getAddress(id, customerId) {
  const address = await addressesDb.findAddressById(id, customerId);
  if (!address) throw new AppError('Address not found.', 404);
  return address;
}

export async function createAddress(customerId, data) {
  if (data.isDefault) await addressesDb.clearDefaultForCustomer(customerId);
  const id = await addressesDb.createAddress(customerId, data);
  return addressesDb.findAddressById(id, customerId);
}

export async function updateAddress(id, customerId, data) {
  await getAddress(id, customerId);
  await addressesDb.updateAddress(id, customerId, data);
  return addressesDb.findAddressById(id, customerId);
}

export async function deleteAddress(id, customerId) {
  await getAddress(id, customerId);
  await addressesDb.deleteAddress(id, customerId);
}

export async function setDefaultAddress(id, customerId) {
  await getAddress(id, customerId);
  await addressesDb.clearDefaultForCustomer(customerId);
  await addressesDb.setDefaultAddress(id, customerId);
  return addressesDb.findAddressById(id, customerId);
}
