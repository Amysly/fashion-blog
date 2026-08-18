import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

// @desc   Get all products
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {

  const products = await Product.find().sort({ createdAt: -1 });
  res.status(200).json(products);
});

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public
const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({slug:req.params.slug});

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(product);
});

// @desc   Create product
// @route  POST /api/products/admin/create-product
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("You don't have access to create a product");
  }

  const { name, price, description } = req.body || {}

  if (!name || !price || !description) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a product image');
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const product = await Product.create({
    name,
    price,
    description,
    image: result.secure_url,
    user: req.user._id
  });

  res.status(201).json(product);
});

// @desc   Update product
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("You don't have access to update a product");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const { name, price } = req.body;

  if (name) product.name = name;
  if (price) product.price = price;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    product.image = result.secure_url;
  }

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});

// @desc   Delete product
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403);
    throw new Error("You don't have access to delete a product");
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();
  res.status(200).json({ id: req.params.id });
});

export default {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};