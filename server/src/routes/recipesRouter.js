import { Router } from "express";
// import authMiddleware from "../middleware/authMiddleware.js"
import {
  getAllRecipes,
  getSingleRecipe,
  postRecipe,
  deleteRecipe
} from "../controllers/recipesController.js";
import {
  postComment,
  getAllComments,
  deleteComment,
  updateComment
} from "../controllers/commentController.js";
const router = Router();
// recipes/

router.get("/", getAllRecipes);
router.get("/:id", getSingleRecipe);
router.post("/", postRecipe);
router.delete("/:id", deleteRecipe);

// router.post("/:id/comments",authMiddleware,postComment)
router.post("/:id/comments", postComment);
router.delete("/:id/comments", deleteComment);
router.patch("/:id/comments/:commentId", updateComment);
router.get("/:id/comments", getAllComments);

export default router;
