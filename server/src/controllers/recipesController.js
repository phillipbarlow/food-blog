import { pool } from "../db/pool.js";
import cloudinary from "../../config/cloudinary.js";

export async function toggleRecipeLike(req, res) {
  const recipeId = Number(req.params.recipeId);
  const userId = req.user.id;

  try {
    const existingLike = await pool.query(
      `SELECT * FROM recipe_likes
       WHERE user_id = $1 AND recipe_id = $2;`,
      [userId, recipeId],
    );

    if (existingLike.rows.length > 0) {
      // if already liked, remove it
      await pool.query(
        `DELETE FROM recipe_likes
         WHERE user_id = $1 AND recipe_id = $2;`,
        [userId, recipeId],
      );

      const countResult = await pool.query(
        `SELECT COUNT(*) AS likes
         FROM recipe_likes
         WHERE recipe_id = $1;`,
        [recipeId],
      );

      return res.status(200).json({
        message: "Recipe unliked",
        liked: false,
        likes: Number(countResult.rows[0].likes),
      });
    }

    // if not liked yet, add it
    await pool.query(
      `INSERT INTO recipe_likes (user_id, recipe_id)
       VALUES ($1, $2);`,
      [userId, recipeId],
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) AS likes
       FROM recipe_likes
       WHERE recipe_id = $1;`,
      [recipeId],
    );

    res.status(200).json({
      message: "Recipe liked",
      liked: true,
      likes: Number(countResult.rows[0].likes),
    });
  } catch (error) {
    console.error("Error getting likes:", error);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getRecipeLikes(req, res) {
  const recipeId = Number(req.params.recipeId);
  const userId = req.user?.id;

  try {
    const countResult = await pool.query(
      `SELECT COUNT(*) AS likes
      FROM recipe_likes
      WHERE recipe_id = $1;`,
      [recipeId],
    );

    let liked = false;

    if (userId) {
      const likedResult = await pool.query(
        `SELECT 1
        FROM recipe_likes
        WHERE recipe_id = $1 AND user_id = $2;`,
        [recipeId, userId],
      );
      liked = likedResult.rows.length > 0;
    }

    res.status(200).json({
      likes: Number(countResult.rows[0].likes),
      liked,
    });
  } catch (error) {
    console.log("Error getting likes ", error);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getRecipeCardInfo(req, res) {
  const { category } = req.query;
  try {
    let result;
    if (category === "baking" || category === "cooking") {
      result = await pool.query(
        `SELECT
        r.id,
        r.title,
        r.image,
        r.likes,
        r.category,
        COUNT(c.id)::int AS comment_count
        FROM recipes r
        LEFT JOIN comments c ON c.recipe_id = r.id
        WHERE category = $1
        GROUP BY r.id, r.title, r.image, r.likes
        ORDER BY r.id DESC;`,
        [category],
      );
    } else {
      result = await pool.query(
        `SELECT
        r.id,
        r.title,
        r.image,
        r.likes,
        r.category,
        COUNT(c.id)::int AS comment_count
        FROM recipes r
        LEFT JOIN comments c ON c.recipe_id = r.id
        GROUP BY r.id, r.title, r.image, r.likes
        ORDER BY r.id DESC;`,
      );
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

export async function getFeaturedRecipePreviews(req,res) {
  try {
    const result = await pool.query(
      `SELECT
        r.id,
        r.title,
        r.image,
        (
          SELECT COUNT(*) FROM recipe_likes rl
          WHERE rl.recipe_id = r.id
        ) AS likes,
        (
          SELECT COUNT(*) FROM comments c
          WHERE c.recipe_id = r.id
        ) AS comment_count
      FROM recipes r;`,
    );

    if(result.rows.length === 0){
      return res.status(404).json({error:"Featured recipe preview card not found"})
    }

    res.status(200).json({
      message: "Recipe preview card recieved successfully",
      recipe: result.rows,
    })
  } catch (error) {
    console.error("Error fetching recipe preview ", error);
    res
      .status(500)
      .json({ error: `Database error from getFeaturedRecipePreviews ${error}` });
  }
}

export async function getAllRecipes(req, res) {
  const { category } = req.query;
  try {
    let result;
    if (category === "baking" || category === "cooking") {
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
  const { recipeId } = req.params;

  try {
    const result = await pool.query("SELECT * FROM recipes WHERE id = $1", [
      recipeId,
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
  const { title, ingredients, instructions, category, image, image_id } =
    req.body;
  const ingredientsString = JSON.stringify(ingredients);
  const instructionsString = JSON.stringify(instructions);

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
  // console.log(req.user.id)
  try {
    const result = await pool.query(
      `INSERT INTO recipes (user_id, title,ingredients ,instructions ,category, image, created_by, image_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
       RETURNING *`,
      [
        req.user.id,
        title,
        ingredientsString,
        instructionsString,
        category,
        image || null,
        req.user.displayname,
        image_id || null,
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
  const { recipeId } = req.params;
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `DELETE FROM recipes WHERE id = $1 
      AND user_id = $2
      RETURNING *`,
      [recipeId, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No recipe found" });
    }
    const { image_id } = result.rows[0];

    if (image_id) {
      await cloudinary.uploader.destroy(image_id);
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
