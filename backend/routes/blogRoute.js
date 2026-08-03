import express from 'express';
import blogController from '../controllers/blogController.js';
import protect from '../middleware/authMiddleWare.js';

const router = express.Router();

router.route('/')
  .post(protect,blogController.createBlog);

router.route('/:id')
  .put(protect, blogController.updateBlog)
  .delete(protect, blogController.deleteBlog);

export default router;