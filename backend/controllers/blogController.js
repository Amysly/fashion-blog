import Blog from "../models/BlogModels.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

const ensureAdmin = (req, res) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    throw new Error("You do not have permission to manage blog posts");
  }
};

const ensureValidBlogId = (id, res) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid blog ID");
  }
};

// @desc    Get all blogs
// @route   GET /api/blog
// @access  Public
const getBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });

  res.status(200).json(blogs);
});

// @desc    Create a new blog
// @route   POST /api/blog
// @access  Private
const createBlog = asyncHandler(async (req, res) => {
  ensureAdmin(req, res);

  const { title, description, category, sections } = req.body;

  if (!title || !description || !category) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  if (!req.files?.image?.[0]) {
    res.status(400);
    throw new Error("Please upload a blog image");
  }

  // Upload cover image
  const coverResult = await uploadToCloudinary(
    req.files.image[0].buffer
  );

  
  let parsedSections = [];

  if (sections) {
    parsedSections =
      typeof sections === "string"
        ? JSON.parse(sections)
        : sections;
  }

  // Upload section images
  const sectionImages = req.files.sectionImages || [];

  const uploadedSections = await Promise.all(
    parsedSections.map(async (section, index) => {
      if (!sectionImages[index]) {
        throw new Error(
          `Please upload an image for section ${index + 1}`
        );
      }

      const result = await uploadToCloudinary(
        sectionImages[index].buffer
      );

      return {
        heading: section.heading,
        description: section.description,
        image: result.secure_url,
      };
    })
  );

  const blog = await Blog.create({
    title,
    description,
    category,
    image: coverResult.secure_url,
    sections: uploadedSections,
    user: req.user.id,
  });

  res.status(201).json(blog);
});

const getBlogBySlug = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({slug: req.params.slug } );

  if (!blog) {
    res.status(404);
    throw new Error('blog not found');
  }

  res.status(200).json(blog);
});
// @desc    Update a blog
// @route   PUT /api/blog/:id
// @access  Private
const updateBlog = asyncHandler(async (req, res) => {
  ensureAdmin(req, res);
  ensureValidBlogId(req.params.id, res);
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
  ensureAdmin(req, res);
  ensureValidBlogId(req.params.id, res);
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
  getBlogBySlug
};
