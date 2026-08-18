import express from 'express';
import productController from '../controllers/productController.js';
import protect from '../middleware/authMiddleWare.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/:slug', productController.getProductBySlug);

router
  .route('/admin/create-product')
  .post(protect, upload.single('image'), productController.createProduct);

router
  .route('/:id')
  .put(protect, upload.single('image'), productController.updateProduct)
  .delete(protect, productController.deleteProduct);

export default router;