import { AppError } from '../utils/AppError.js';
import { env } from '../config/env.js';

export function notFoundHandler(req, res) {
  res.status(404).json({ success: false, error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, _next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.details ? { details: err.details } : {}),
    });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ success: false, error: 'A record with these details already exists.' });
  }

  if (err.code?.startsWith('ER_') || err.code === 'ECONNREFUSED') {
    console.error('Database error:', err);
    return res.status(500).json({ success: false, error: 'A database error occurred.' });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Something went wrong.',
    ...(env.isProduction ? {} : { stack: err.stack }),
  });
}
