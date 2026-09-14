import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import multer from 'multer';
import { env } from './env.js';
import { slugify } from '../utils/slugify.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const uploadsRoot = path.join(__dirname, '..', '..', 'uploads');

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

/**
 * Creates a multer instance that stores files under uploads/<subfolder>/
 * with a temporary random filename. Call finalizeUpload() afterwards to
 * rename the file to its final, human-readable name.
 */
export function createUploader(subfolder) {
  const storage = multer.diskStorage({
    destination: path.join(uploadsRoot, subfolder),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `tmp-${crypto.randomUUID()}${ext}`);
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

/**
 * Renames a just-uploaded (temp-named) file to `<date>-<slug of name>-<shortId>.<ext>`
 * and returns the new filename. `name` is typically the product/category name or
 * banner title — whatever the image belongs to becomes identifiable from the filename.
 */
export async function finalizeUpload(subfolder, file, name) {
  const ext = path.extname(file.originalname).toLowerCase();
  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(name || '').slice(0, 50) || 'file';
  const shortId = crypto.randomBytes(3).toString('hex');
  const filename = `${date}-${slug}-${shortId}${ext}`;

  const dir = path.join(uploadsRoot, subfolder);
  await fs.rename(path.join(dir, file.filename), path.join(dir, filename));
  return filename;
}

export function publicPathFor(subfolder, filename) {
  return `/uploads/${subfolder}/${filename}`;
}

/**
 * Deletes a previously uploaded file given its public path (e.g. `/uploads/products/x.jpg`).
 * Safe to call with null/undefined, and ignores "already gone" errors.
 */
export async function deleteUploadedFile(publicPath) {
  if (!publicPath) return;
  const relative = publicPath.replace(/^\/uploads\//, '');
  const fullPath = path.join(uploadsRoot, relative);
  try {
    await fs.unlink(fullPath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
