import { pool } from "../db/pool.js";
import jwt from "jsonwebtoken";

export async function getAllRecipes(req, res) {
  const { category } = req.query;
  try {
    let result;
    if (category) {
      //  if (category === "baking" || category === "cooking") {
      result = await pool.query(
        "SELECT * FROM recipes WHERE category = $1 ORDER BY id DESC",
        [category],
      );
    } else {
      result = await pool.query("SELECT * FROM recipes ORDER BY id DESC");
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.json({
      message: "Recipes recieved successfully",
      recipes: result.rows,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res
      .status(500)
      .json({ error: `Database error from getAllRecipes ${error}` });
  }
}

export async function getSingleRecipe(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json({
      message: "Recipe recieved successfully",
      recipe: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ err: `Database error ${err}` });
  }
}

export async function postRecipe(req, res) {
  const { title, ingredients, instructions, category, image } = req.body;
  const ingredientsString = JSON.stringify(ingredients);
  const instructionsString = JSON.stringify(instructions);
  // const image = "/default-items-image.png";
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const username = decoded.username; 

  if (!title) {
    return res.status(400).json({ error: "Title is missing" });
  }
  if (!ingredients) {
    return res.status(400).json({ error: "Ingredients are missing" });
  }
  if (!instructions) {
    return res.status(400).json({ error: "Instructions are missing" });
  }
  if (!category) {
    return res.status(400).json({ error: "Category is missing" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO recipes (title,ingredients ,instructions ,category, image, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title,
        ingredientsString,
        instructionsString,
        category,
        image || null,
        username,
      ],
    );
    res.status(201).json({
      message: "Recipe posted successfully",
      recipe: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ error: `Database error from postRecipe ${error}` });
  }
}

export async function deleteRecipe(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM recipes WHERE id = $1 RETURNING *`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No recipe found" });
    }
    return res.status(200).json({
      message: "recipe and comments deleted successfully",
      recipe: result.rows[0],
    });
  } catch (error) {
    console.log("Error deleting Recipe", error);
    res
      .status(500)
      .json({ error: `Database error from deleteRecipe ${error}` });
  }
}
