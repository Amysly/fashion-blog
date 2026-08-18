import express from 'express';
import trendingOutfitController from '../controllers/trendingOutfitController.js';
import protect from '../middleware/authMiddleWare.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', trendingOutfitController.getTrendingOutfit,);
router.get('/:slug', trendingOutfitController.getTrendingBySlug);

router
  .route('/admin/create-trendingoutfit')
  .post(protect, upload.single('image'), trendingOutfitController.createTrendingOutfit);

router
  .route('/:id')
  .put(protect, upload.single('image'), trendingOutfitController.updateTrendingOutfit)
  .delete(protect, trendingOutfitController.deleteTrendingOutfit);

export default router;