import { Router } from "express";
import { deleteComment, updateComment,postComment } from "../controllers/commentController.js";
const router = Router();

export default router;

router.delete("/:id", deleteComment);
router.patch("/:id", updateComment);
router.post("/:id/comments", postComment);
