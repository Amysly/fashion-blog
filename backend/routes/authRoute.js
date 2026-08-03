import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.login);
router.post('/logout', userController.logOut);
router.post('/refresh', userController.refresh);

export default router;