import nodemailer from 'nodemailer';
import { env } from './env.js';

export const transporter = env.mail.user && env.mail.pass
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.mail.user,
        pass: env.mail.pass,
      },
    })
  : null;

export async function sendEmail({ to, subject, html }) {
  if (!transporter) {
    console.warn(`[email skipped: no GMAIL credentials configured] to=${to} subject="${subject}"`);
    return;
  }

  try {
    await transporter.sendMail({ from: env.mail.emailFrom, to, subject, html });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
  }
}
