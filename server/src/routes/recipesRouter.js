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
router.post("/",requireAuth, postRecipe);
router.get("/:recipeId", getSingleRecipe);
router.delete("/:recipeId",requireAuth, deleteRecipe);

// comments for a recipe
router.get("/:recipeId/comments", getAllComments);
router.post("/:recipeId/comments",requireAuth,postComment)
router.patch("/:recipeId/comments/:commentId",requireAuth, updateComment);
router.delete("/:recipeId/comments/:commentId",requireAuth, deleteComment);

export default router;
