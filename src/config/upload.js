import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import multer from 'multer';
import { env } from './env.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

/**
 * Creates a multer instance that stores files under uploads/<subfolder>/
 * with a random filename (avoids collisions and path traversal from user input).
 */
export function createUploader(subfolder) {
  const storage = multer.diskStorage({
    destination: path.join(uploadsRoot, subfolder),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${crypto.randomUUID()}${ext}`);
    },
  });

  return multer({
    storage,
    limits: { fileSize: env.upload.maxFileSizeMb * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
        return cb(new Error('Only JPEG, PNG, and WebP images are allowed.'));
      }
      cb(null, true);
    },
  });
}

export function publicPathFor(subfolder, filename) {
  return `/uploads/${subfolder}/${filename}`;
}
