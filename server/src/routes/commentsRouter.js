import { Router } from "express";
import { deleteComment } from "../controllers/commentController.js";
const router = Router();

export default router;

router.delete("/:id", deleteComment);

// (Optional) PATCH /comments/:id   → edit a comment
// router.patch("/:id", updateComment);
