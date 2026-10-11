import PageView from "../models/pageViewsModel.js";

const recordPageView = async (req, res) => {
  try {
    const { postId, visitorId } = req.body;

    if (!postId || !visitorId) {
      return res.status(400).json({
        message: "postId and visitorId are required",
      });
    }

    await PageView.create({
      postId,
      visitorId,
    });

    res.status(201).json({
      message: "Page view recorded successfully",
    });
  } catch (error) {
    console.error("Record page view error:", error);

    res.status(500).json({
      message: "Failed to record page view",
    });
  }
};

const getMonthlyReaders = async (req, res) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const uniqueReaders = await PageView.distinct("visitorId", {
      createdAt: {
        $gte: startOfMonth,
        $lte: now,
      },
    });

    res.status(200).json({
      monthlyReaders: uniqueReaders.length,
    });
  } catch (error) {
    console.error("Get monthly readers error:", error);

    res.status(500).json({
      message: "Failed to get monthly readers",
    });
  }
};

export{
  recordPageView,
  getMonthlyReaders
};