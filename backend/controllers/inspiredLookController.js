import InspiredLooks from "../models/inspiredLooksModel.js";
import asyncHandler from "express-async-handler";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// @desc    Get all inspired looks
// @route   GET /api/inspiredLooks
// @access  Public
const getInspiredLooks = asyncHandler(async (req, res) => {
  const inspiredLooks = await InspiredLooks.find().sort({ createdAt: -1 });

  res.status(200).json(inspiredLooks);
});

// @desc    Create a new inspired look
// @route   POST /api/inspiredLooks
// @access  Private/Admin
const createInspiredLooks = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("Please upload an image");
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const inspiredLooks = await InspiredLooks.create({
    image: result.secure_url,
    user: req.user.id,
  });

  res.status(201).json(inspiredLooks);
});

// @desc    Update an inspired look
// @route   PUT /api/inspiredLooks/:id
// @access  Private/Admin
const updateInspiredLooks = asyncHandler(async (req, res) => {
  const inspiredLooks = await InspiredLooks.findById(req.params.id);

  if (!inspiredLooks) {
    res.status(404);
    throw new Error("Inspired look not found");
  }

  let image = inspiredLooks.image;

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer);
    image = result.secure_url;
  }

  inspiredLooks.image = image;

  const updatedInspiredLooks = await inspiredLooks.save();

  res.status(200).json(updatedInspiredLooks);
});

// @desc    Delete an inspired look
// @route   DELETE /api/inspiredLooks/:id
// @access  Private/Admin
const deleteInspiredLooks = asyncHandler(async (req, res) => {
  const inspiredLooks = await InspiredLooks.findById(req.params.id);

  if (!inspiredLooks) {
    res.status(404);
    throw new Error("Inspired look not found");
  }

  await inspiredLooks.deleteOne();

  res.status(200).json({
    message: "Inspired look deleted successfully",
    id: req.params.id,
  });
});

export default {
  getInspiredLooks,
  createInspiredLooks,
  updateInspiredLooks,
  deleteInspiredLooks,
};