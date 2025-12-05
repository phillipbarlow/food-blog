import { Router } from "express";
import {deleteComment } from "../controllers/commentController.js";
const router = Router();

// router.post("/", postComment);
router.delete("/:id", deleteComment);

export default router;

// // (Optional) GET /comments         → maybe all comments (you probably don't need this)
// router.get("/", getAllComments);

// (Optional) GET /comments/:id     → single comment (most blogs don't really need this)
// router.get("/:id", getCommentById);

// ✅ DELETE /comments/:id          → delete a comment by its own id
// router.delete("/:id", deleteComment);

// (Optional) PATCH /comments/:id   → edit a comment
// router.patch("/:id", updateComment);
