import { asyncHandler } from '../../utils/asyncHandler.js';
import * as blogService from '../../services/blog.service.js';

export const listCategories = asyncHandler(async (req, res) => {
  const categories = await blogService.listCategories();
  res.json({ success: true, data: categories });
});

export const listPosts = asyncHandler(async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;
  const { rows, meta } = await blogService.listPublishedPosts({ page: Number(page), pageSize: Number(pageSize) });
  res.json({ success: true, data: rows, meta });
});

export const getPost = asyncHandler(async (req, res) => {
  const post = await blogService.getPublishedPostBySlug(req.params.slug);
  res.json({ success: true, data: post });
});
