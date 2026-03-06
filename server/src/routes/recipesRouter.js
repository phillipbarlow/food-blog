import { Router } from "express";
import {requireAuth} from "../middleware/authMiddleware.js"
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
router.post("/", postRecipe);
router.get("/:recipeId", getSingleRecipe);
router.delete("/:recipeId", deleteRecipe);

// comments for a recipe
router.get("/:recipeId/comments", getAllComments);
router.post("/:recipeId/comments",postComment)
router.patch("/:recipeId/comments/:commentId", updateComment);
router.delete("/:recipeId/comments/:commentId", deleteComment);

export default router;
