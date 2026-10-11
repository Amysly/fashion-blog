import express from "express";
import rateLimit from "express-rate-limit";
import {
  recordPageView,
  getMonthlyReaders,
} from "../controllers/analyticsController.js";
import  protect  from "../middleware/authMiddleWare.js"

const router = express.Router();

// Rate limit page-view tracking to prevent spam / bot abuse.
const pageViewLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,             // 30 requests per IP per minute
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please slow down." },
});

router.post("/page-view", pageViewLimiter, recordPageView);

router.get("/monthly-readers", protect, getMonthlyReaders);

export default router;