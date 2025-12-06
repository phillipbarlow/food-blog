import { Router } from "express";
import { deleteComment, updateComment } from "../controllers/commentController.js";
const router = Router();

export default router;

router.delete("/:id", deleteComment);
router.patch("/:id", updateComment)
