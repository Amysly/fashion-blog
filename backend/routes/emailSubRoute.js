import express from "express"
import emailSubController from "../controllers/emailSubController.js"
import protect from '../middleware/authMiddleWare.js';

const router = express.Router();

router.get('/admin/get-subscribers', protect,emailSubController.getEmailSubByAdmin);

router.post( '/email-subscription',  emailSubController.createEmailSub);
router.get('/unsubscribe', emailSubController.unsubscribeEmail);

export default router
