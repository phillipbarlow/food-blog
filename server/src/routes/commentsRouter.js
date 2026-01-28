import { Router } from "express";
import { deleteComment,postComment } from "../controllers/commentController.js";
const router = Router();

export default router;
// comments/
router.delete("/:id", deleteComment);
router.post("/:id/comments", postComment);
router.post("/:id/comments", );
