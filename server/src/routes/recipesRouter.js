import { Router } from "express";
import {
  getAllRecipes,
  getSingleRecipe,
  postRecipe,
  deleteRecipe
} from "../controllers/recipesController.js";
import {postComment, getAllComments} from "../controllers/commentController.js"
const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getSingleRecipe);
router.post("/", postRecipe);
router.delete("/:id", deleteRecipe)

router.post("/:id/comments",postComment)
router.get("/:id/comments", getAllComments);

export default router;
