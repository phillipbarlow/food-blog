import { Router } from "express";
import {
  getAllRecipes,
  getSingleRecipe,
  postRecipe,
  getAllPostComments,
  deleteRecipe
} from "../controllers/recipesController.js";
const router = Router();

router.get("/", getAllRecipes);
router.get("/:id", getSingleRecipe);
router.get("/:id/comments", getAllPostComments);
router.post("/", postRecipe);
router.delete("/:id", deleteRecipe)

export default router;
