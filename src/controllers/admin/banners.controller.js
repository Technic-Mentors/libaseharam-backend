import { asyncHandler } from '../../utils/asyncHandler.js';
import { AppError } from '../../utils/AppError.js';
import { finalizeUpload, publicPathFor } from '../../config/upload.js';
import * as bannerService from '../../services/banner.service.js';

export const list = asyncHandler(async (req, res) => {
  const { page, pageSize } = req.query;
  const { rows, meta } = await bannerService.listAll({
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
  });
  res.json({ success: true, data: rows, meta });
});

export const create = asyncHandler(async (req, res) => {
  if (!req.file) throw new AppError('A banner image is required.', 400);
  const filename = await finalizeUpload('banners', req.file, req.body.title);
  const imagePath = publicPathFor('banners', filename);
  const banner = await bannerService.createBanner({ ...req.body, imagePath });
  res.status(201).json({ success: true, data: banner, message: 'Banner created.' });
});

export const update = asyncHandler(async (req, res) => {
  let imagePath;
  if (req.file) {
    const filename = await finalizeUpload('banners', req.file, req.body.title);
    imagePath = publicPathFor('banners', filename);
  }
  const banner = await bannerService.updateBanner(Number(req.params.id), { ...req.body, imagePath });
  res.json({ success: true, data: banner, message: 'Banner updated.' });
});

export const remove = asyncHandler(async (req, res) => {
  await bannerService.deleteBanner(Number(req.params.id));
  res.json({ success: true, message: 'Banner deleted.' });
});
