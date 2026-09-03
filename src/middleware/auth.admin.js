import { verifyJwt } from '../utils/jwt.js';
import { COOKIE_NAMES } from '../utils/cookies.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export function requireAdmin(req, res, next) {
  const token = req.cookies?.[COOKIE_NAMES.adminAccess];
  if (!token) return next(new AppError('Admin authentication required.', 401));

  try {
    const payload = verifyJwt(token, env.jwt.adminSecret);
    req.admin = { id: payload.sub };
    next();
  } catch {
    next(new AppError('Your session has expired. Please log in again.', 401));
  }
}
