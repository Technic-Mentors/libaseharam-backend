import * as contactMessagesDb from '../db/queries/contactMessages.queries.js';
import * as notificationsDb from '../db/queries/notifications.queries.js';
import { parsePagination, buildPaginationMeta } from '../utils/pagination.js';

export async function submitMessage({ name, email, message }) {
  const id = await contactMessagesDb.insertContactMessage({ name, email, message });

  await notificationsDb.createNotification({
    type: 'contact_message',
    title: 'New contact message',
    message: `${name} sent a message via the Contact Us form.`,
    link: '/admin/contact-messages',
  });

  return { id };
}

export async function listMessagesAdmin(query) {
  const { page, pageSize, offset } = parsePagination(query);
  const { rows, total } = await contactMessagesDb.listContactMessages({ limit: pageSize, offset });
  return { rows, meta: buildPaginationMeta({ page, pageSize, total }) };
}

export async function markMessageRead(id) {
  await contactMessagesDb.markContactMessageRead(id);
}
