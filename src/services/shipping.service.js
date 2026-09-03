import { AppError } from '../utils/AppError.js';
import { getSetting, setSettings } from '../db/queries/settings.queries.js';
import * as zonesDb from '../db/queries/shippingZones.queries.js';

export async function computeShippingCharge(city, subtotal) {
  const freeThreshold = Number((await getSetting('free_shipping_threshold')) || 0);
  if (freeThreshold > 0 && subtotal >= freeThreshold) return 0;

  const zone = await zonesDb.findShippingZoneByCity(city);
  if (zone) return Number(zone.charge);

  const defaultRate = Number((await getSetting('default_shipping_rate')) || 0);
  return defaultRate;
}

export async function getShippingSettings() {
  const [defaultRate, freeThreshold, zones] = await Promise.all([
    getSetting('default_shipping_rate'),
    getSetting('free_shipping_threshold'),
    zonesDb.listShippingZones(),
  ]);
  return {
    defaultShippingRate: Number(defaultRate || 0),
    freeShippingThreshold: Number(freeThreshold || 0),
    zones,
  };
}

export async function updateShippingSettings({ defaultShippingRate, freeShippingThreshold }) {
  await setSettings({
    default_shipping_rate: String(defaultShippingRate),
    free_shipping_threshold: String(freeShippingThreshold),
  });
  return getShippingSettings();
}

export async function createZone(data) {
  const id = await zonesDb.createShippingZone(data);
  return zonesDb.findShippingZoneById(id);
}

export async function updateZone(id, data) {
  const zone = await zonesDb.findShippingZoneById(id);
  if (!zone) throw new AppError('Shipping zone not found.', 404);
  await zonesDb.updateShippingZone(id, data);
  return zonesDb.findShippingZoneById(id);
}

export async function deleteZone(id) {
  const zone = await zonesDb.findShippingZoneById(id);
  if (!zone) throw new AppError('Shipping zone not found.', 404);
  await zonesDb.deleteShippingZone(id);
}
