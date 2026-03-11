import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { signup, login, updateUserSettings } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.patch("/users/me", requireAuth, updateUserSettings);


export default router;
