import express from 'express'
import herosectionController from '../controllers/herosectionController.js';
import protect from '../middleware/authMiddleWare.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/admin/get-herosection', herosectionController.getHerosection);

router
  .route('/admin/create-herosection')
  .post(protect, upload.single('image'), herosectionController.createHerosection);

router
  .route('/:id')
  .put(protect, upload.single('image'), herosectionController.updateHerosection)
  .delete(protect, herosectionController.deleteHeroSection);

export default router;