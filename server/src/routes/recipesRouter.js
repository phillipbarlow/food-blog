import { Router } from "express";
import {requireAuth} from "../middleware/authMiddleware.js"
import {
  getSingleRecipe,
  postRecipe,
  deleteRecipe,
  getRecipeCardInfo,
  toggleRecipeLike,
  getRecipeLikes,
  getFeaturedRecipePreviews
} from "../controllers/recipesController.js";
import {
  postComment,
  getAllComments,
  deleteComment,
  updateComment
} from "../controllers/commentController.js";
// import {getRecipeCardInfo} from "../db/userInfo.js"
const router = Router();

// recipes/
// router.get("/", getAllRecipes);
router.get("/", getRecipeCardInfo);
router.get("/previewCard",getFeaturedRecipePreviews)
router.post("/",requireAuth, postRecipe);
router.get("/:recipeId", getSingleRecipe);
router.delete("/:recipeId",requireAuth, deleteRecipe);
// router.patch("/:recipeId/like",requireAuth,recipeLike)
router.post("/:recipeId/like",requireAuth,toggleRecipeLike)
router.get("/:recipeId/like",getRecipeLikes)
// comments for a recipe
router.get("/:recipeId/comments", getAllComments);
router.post("/:recipeId/comments",requireAuth,postComment)
router.patch("/:recipeId/comments/:commentId",requireAuth, updateComment);
router.delete("/:recipeId/comments/:commentId",requireAuth, deleteComment);

export default router;
