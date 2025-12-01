import { Router } from "express";
import { postComment, deleteComment } from "../controllers/commentController.js";
const router = Router();

router.post("/", postComment);
router.delete("/:id", deleteComment);

export default router;
