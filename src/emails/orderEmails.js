import { sendEmail } from '../config/resend.js';
import { env } from '../config/env.js';

function layout(bodyHtml) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1c1917;">
      <h2 style="color: #92722a;">Libas-e-Haram</h2>
      ${bodyHtml}
      <p style="margin-top: 32px; font-size: 12px; color: #78716c;">
        Libas-e-Haram · Gujranwala, Punjab, Pakistan · +92 322 1527802
      </p>
    </div>
  `;
}

const STATUS_MESSAGES = {
  placed: 'We\'ve received your order and will call you shortly to confirm it.',
  confirmed: 'Your order has been confirmed and is being prepared.',
  packed: 'Your order has been packed and will ship soon.',
  shipped: 'Your order is on its way!',
  delivered: 'Your order has been delivered. Thank you for shopping with us!',
  cancelled: 'Your order has been cancelled.',
  returned: 'Your return has been recorded.',
};

export async function sendOrderPlacedEmail(to, order) {
  await sendEmail({
    to,
    subject: `Order ${order.order_number} received — Libas-e-Haram`,
    html: layout(`
      <p>Thank you for your order! Here are the details:</p>
      <p><strong>Order Number:</strong> ${order.order_number}<br/>
         <strong>Total:</strong> Rs. ${order.total}<br/>
         <strong>Payment:</strong> Cash on Delivery</p>
      <p>${STATUS_MESSAGES.placed}</p>
    `),
  });
}

export async function sendOrderStatusEmail(to, order) {
  await sendEmail({
    to,
    subject: `Order ${order.order_number} update — Libas-e-Haram`,
    html: layout(`
      <p><strong>Order Number:</strong> ${order.order_number}</p>
      <p>${STATUS_MESSAGES[order.status] || 'Your order status has been updated.'}</p>
    `),
  });
}

export async function sendAdminNewOrderAlert(order) {
  if (!env.resend.adminAlertEmail) return;
  await sendEmail({
    to: env.resend.adminAlertEmail,
    subject: `New order ${order.order_number} — Rs. ${order.total}`,
    html: layout(`
      <p>A new order has been placed.</p>
      <p><strong>Order Number:</strong> ${order.order_number}<br/>
         <strong>Total:</strong> Rs. ${order.total}<br/>
         <strong>City:</strong> ${order.shipping_city}</p>
    `),
  });
}
