import { verifyJwt } from '../utils/jwt.js';
import { COOKIE_NAMES } from '../utils/cookies.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export function requireCustomer(req, res, next) {
  const token = req.cookies?.[COOKIE_NAMES.customerAccess];
  if (!token) return next(new AppError('Please log in to continue.', 401));

  try {
    const payload = verifyJwt(token, env.jwt.customerSecret);
    req.customer = { id: payload.sub };
    next();
  } catch {
    next(new AppError('Your session has expired. Please log in again.', 401));
  }
}

/** Attaches req.customer if logged in, but does not require it (for guest-accessible routes). */
export function attachCustomerIfPresent(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAMES.customerAccess];
  if (!token) return next();

  try {
    const payload = verifyJwt(token, env.jwt.customerSecret);
    req.customer = { id: payload.sub };
  } catch {
    // ignore invalid/expired token for optional-auth routes
  }
  next();
}
