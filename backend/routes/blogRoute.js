import express from "express";
import blogController from "../controllers/blogController.js";
import protect from "../middleware/authMiddleWare.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

router
  .route("/")
  .post(
    protect,
    upload.single("image"),
    blogController.createBlog
  );

router
  .route("/:id")
  .put(protect, upload.single("image"), blogController.updateBlog)
  .delete(protect, blogController.deleteBlog);

export default router;