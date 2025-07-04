import express from 'express'
import { userRegister, userLogin, getUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post("/register" , userRegister);
router.post("/login" , userLogin);
router.get("/profile", verifyToken, getUserProfile);
// router.post("/info" , );

export default router;