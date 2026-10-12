import mongoose from "mongoose";
import PageView from "../models/pageViewsModel.js";
import Blog from "../models/BlogModels.js";

const recordPageView = async (req, res) => {
  try {
    const { postId, visitorId } = req.body;

    if (!postId || !visitorId) {
      return res.status(400).json({ message: "postId and visitorId are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId" });
    }

    const blogExists = await Blog.exists({ _id: postId });
    if (!blogExists) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await PageView.updateOne(
      { postId, visitorId },
      { $setOnInsert: { postId, visitorId } },
      { upsert: true }
    );

    res.status(201).json({ message: "Page view recorded successfully" });
  } catch (error) {
    console.error("Record page view error:", error);
    res.status(500).json({ message: "Failed to record page view" });
  }
};

const getMonthlyReaders = async (req, res) => {
  try {
    const { postId } = req.query;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const filter = { createdAt: { $gte: startOfMonth } };
    if (postId) {
      if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId" });
      }
      filter.postId = postId;
    }

    const uniqueReaders = await PageView.distinct("visitorId", filter);

    res.status(200).json({ monthlyReaders: uniqueReaders.length });
  } catch (error) {
    console.error("Get monthly readers error:", error);
    res.status(500).json({ message: "Failed to get monthly readers" });
  }
};

export { recordPageView, getMonthlyReaders };