import asyncHandler from 'express-async-handler';
import TrendingOutfit from '../models/trendingOutfitModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

// @desc   Get all trending outfit
// @route  GET /api/products
// @access Public
const getTrendingOutfit = asyncHandler(async (req, res) => {
  const trending = await TrendingOutfit.find().sort({ createdAt: -1 });
  res.status(200).json(trending);
});



// @desc   Create trending outfit
// @route  POST /api/products/admin/create-product
// @access Private/Admin
const createTrendingOutfit = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("You don't have access to create a trending outfit");
  }

  const { name, description } = req.body;

  if (!name || !description ) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a trending outfit image');
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const trending = await TrendingOutfit.create({
    name,
    description,
    image: result.secure_url,
    user: req.user._id
  });

  res.status(201).json(trending);
});

const getTrendingBySlug = asyncHandler(async (req, res) => {
  const trendingOutfit = await TrendingOutfit.findOne({ slug: req.params.slug });

  if (!trendingOutfit) {
    res.status(404);
    throw new Error('Trending outfit not found');
  }

  res.status(200).json(trendingOutfit);
});

// @desc   Update trendingOutfit
// @route  PUT /api/products/:id
// @access Private/Admin
const updateTrendingOutfit = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("You don't have access to update a trending  outfit");
  }

  const trending = await Product.findById(req.params.id);

  if (!trending) {
    res.status(404);
    throw new Error('trending outfit not found');
  }

  const { name } = req.body;

  if (name) trending.name = name;


  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    trending.image = result.secure_url;
  }

  const updatedtrendingOutfit = await TrendingOutfit.save();
  res.status(200).json(updatedtrendingOutfit);
});

// @desc   Delete trending outfit
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteTrendingOutfit = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("You don't have access to delete a trending product");
  }

  const trnding = await TrendingOutfit.findById(req.params.id);

  if (!trending) {
    res.status(404);
    throw new Error('trending outfit not found');
  }

  await trending.deleteOne();
  res.status(200).json({ id: req.params.id });
});

export default {
  getTrendingOutfit,
  createTrendingOutfit,
  updateTrendingOutfit,
  deleteTrendingOutfit,
   getTrendingBySlug
};