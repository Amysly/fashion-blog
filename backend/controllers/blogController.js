import Blog from '../models/BlogModels.js';
import asyncHandler from 'express-async-handler';



const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.find();
  if (!blog || blog.length === 0) {
    res.status(404);
    throw new Error("blog not found");
    
  }
  res.status(200).json(blog);
});

// @desc    Create a new blog
// @route   POST /api/blog
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  const blog = await Blog.create({
    title,
    description,
    category,
    user:req.user.id
  });

  res.status(201).json(blog);
});

// @desc    Update a blog
// @route   PUT /api/blog/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  if (department.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  res.status(200).json(blog);
});

// @desc    Delete a blog
// @route   Delete /api/blog/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {  
    res.status(404);
    throw new Error('Blog not found');
  }

  if (blog.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized');
  }

  await blog.deleteOne();

  res.status(200).json({ message: 'Blog deleted', id: req.params.id });
});

export default {
  getBlog ,
  createBlog,
  updateBlog,
  deleteBlog
};