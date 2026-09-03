import { Resend } from 'resend';
import { env } from './env.js';

export const resend = env.resend.apiKey ? new Resend(env.resend.apiKey) : null;

export async function sendEmail({ to, subject, html }) {
  if (!resend) {
    console.warn(`[email skipped: no RESEND_API_KEY configured] to=${to} subject="${subject}"`);
    return;
  }

  try {
    await resend.emails.send({ from: env.resend.emailFrom, to, subject, html });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error.message);
  }
}
