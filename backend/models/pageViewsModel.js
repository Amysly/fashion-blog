import mongoose from "mongoose";

const pageViewSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    visitorId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

pageViewSchema.index({ createdAt: 1, visitorId: 1 });

// prevent the same visitor from being counted twice for the same post.
pageViewSchema.index({ postId: 1, visitorId: 1 }, { unique: true });

// auto-delete old page views after 1 year to keep the collection small.
 pageViewSchema.index(
  { createdAt: 1 },
   { expireAfterSeconds: 60 * 60 * 24 * 365 }
);

export default mongoose.model("PageView", pageViewSchema);