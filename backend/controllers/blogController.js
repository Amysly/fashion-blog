import Blog from "../models/BlogModels.js";
import asyncHandler from "express-async-handler";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
const getBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();

  if (!blogs || blogs.length === 0) {
    res.status(404);
    throw new Error("No blogs found");
  }

  res.status(200).json(blogs);
});

// @desc    Create a new blog
// @route   POST /api/blog
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (!req.file) {
    res.status(400);
    throw new Error("Please upload a blog image");
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const blog = await Blog.create({
    title,
    description,
    category,
    image: result.secure_url,
    user: req.user.id,
  });

  res.status(201).json(blog);
});

// @desc    Update a blog
// @route   PUT /api/blog/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  // Check ownership before updating
  if (blog.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  let image = blog.image;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    image = result.secure_url;
  }

  blog.title = req.body.title || blog.title;
  blog.description = req.body.description || blog.description;
  blog.category = req.body.category || blog.category;
  blog.image = image;

  const updatedBlog = await blog.save();

  res.status(200).json(updatedBlog);
});

// @desc    Delete a blog
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized");
  }

  await blog.deleteOne();

  res.status(200).json({
    message: "Blog deleted successfully",
    id: req.params.id,
  });
});

export default {
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};