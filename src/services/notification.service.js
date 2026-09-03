import * as notificationsDb from '../db/queries/notifications.queries.js';

export async function listRecent() {
  const [notifications, unreadCount] = await Promise.all([
    notificationsDb.listRecentNotifications(),
    notificationsDb.countUnread(),
  ]);
  return { notifications, unreadCount };
}

export async function markAllRead() {
  await notificationsDb.markAllRead();
}

export async function markRead(id) {
  await notificationsDb.markRead(id);
}

export async function listRecentForCustomer(customerId) {
  const [notifications, unreadCount] = await Promise.all([
    notificationsDb.listRecentForCustomer(customerId),
    notificationsDb.countUnreadForCustomer(customerId),
  ]);
  return { notifications, unreadCount };
}

export async function markAllReadForCustomer(customerId) {
  await notificationsDb.markAllReadForCustomer(customerId);
}

export async function markReadForCustomer(id, customerId) {
  await notificationsDb.markReadForCustomer(id, customerId);
}
