import { pool } from "../db/pool.js";

export async function getAllRecipes(req, res) {
  const { category } = req.query;
  try {
    let result;
    if (category) {
      result = await pool.query(
        "SELECT * FROM recipes WHERE category = $1 ORDER BY id DESC",
        [category]
      );
    } else {
      result = await pool.query("SELECT * FROM recipes ORDER BY id DESC");
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No recipes found" });
    }
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Database error line 15" });
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

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ err: `Database error ${err}`});
  }
}

export async function postRecipe(req, res) {
  const { title, description, category } = req.body;
  console.log(title,description,category)
  const image = "/default-items-image.png";
  if (!title) {
    return res.status(400).json({ error: "Title is missing" });
  }
  if (!description) {
    return res.status(400).json({ error: "Description is missing" });
  }
  if (!category) {
    return res.status(400).json({ error: "category is missing" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO recipes (title, description, image ,category)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description, image || null, category]
    );
    console.log(result.rows[0])
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error, '-- line 67')
    console.error("❌ Error inserting recipe:", error);
    res.status(500).json({ error: "Database error line 50" });
  }
}

export async function deleteRecipe(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM recipes WHERE id = $1 RETURNING *`,
      [id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "no comment found" });
    }
    res.status(200).json({
      message: "recipe deleted successfully",
      deletedRecipe: result.rows[0],
    });
  } catch (err) {
    console.log("Error deleting comment", err);
    res.status(500).json({ error: "Database error from comments" });
  }
}
