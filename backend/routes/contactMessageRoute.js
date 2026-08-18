import express from "express"
import emailSubController from "../controllers/emailSubController.js"

const router = express.Router();

router.post('/', emailSubController.submitContactForm);


export default router
