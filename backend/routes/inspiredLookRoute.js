import express from "express";
import inspiredLookController from "../controllers/inspiredLookController.js";
import protect from "../middleware/authMiddleWare.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();
router.get('/admin/get-inspiredlooks', inspiredLookController.getInspiredLooks );
router
  .route("/admin/create-inspiredlooks")
  .post(
    protect,
    upload.single("image"),
    inspiredLookController.createInspiredLooks
  );

router
  .route("/:id")
  .put(protect, upload.single("image"), inspiredLookController.updateInspiredLooks)
  .delete(protect, inspiredLookController.deleteInspiredLooks);

export default router;