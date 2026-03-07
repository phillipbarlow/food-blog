import { pool } from "../db/pool.js";
import { getCommentsWithUsers } from "../db/comments.js";

export async function postComment(req, res) {
  const recipeId = Number(req.params.recipeId);
  const { comment, rating, name } = req.body;
  const userId = req.user.id;

  const time = new Date().toISOString().replace("T", " ").slice(0, 16);
  const avatar = "/user.png";
  const missing = [];
  if (!recipeId) missing.push("recipeId");
  if (!name) missing.push("name");
  if (!comment) missing.push("comment");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      received: req.body,
      missing,
    });
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO comments (recipe_id, user_id, name, time, comment, avatar, rating)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *;`,
      [recipeId, userId, name, time, comment, avatar, rating || null],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting comment:", error);
    res.status(500).json({ error: "Database error" });
  }
}

export async function deleteComment(req, res) {
  const { recipeId, commentId } = req.params;

  const recipeid = Number(recipeId);
  const commentid = Number(commentId);
  const userId = req.user.id;

  try {
    if (!commentid) {
      return res.status(400).json({
        error: "Invalid comment id",
        details: { commentId },
      });
    }
    if (!recipeid) {
      return res.status(400).json({
        error: "Invalid comment id",
        details: { recipeid },
      });
    }
    const result = await pool.query(
      `DELETE FROM comments WHERE comments.id = $1
      AND comments.recipe_id = $2
      AND comments.user_id = $3 RETURNING *`,
      [commentid, recipeid, userId],
    );

    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "You are not authorised to delete this comment" });
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment: result.rows[0],
    });
  } catch (err) {
    console.log("Database error deleting comment", err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getAllComments(req, res) {
  const { recipeId } = req.params;

  try {
    const recipe = await pool.query("SELECT * FROM recipes WHERE id = $1 ", [
      recipeId,
    ]);

    if (recipe.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    const result = await getCommentsWithUsers(recipeId);
    
    return res.status(200).json({
      comments: result,
    });
  } catch (err) {
    console.log("Error getting comments", err);
    res.status(500).json({ error: "Database Error from comments" });
  }
}

export async function updateComment(req, res) {
  const { recipeId, commentId } = req.params;
  const { comment, rating } = req.body;
  const userId = req.user.id;

   if (!comment && rating === undefined) {
    return res.status(400).json({
      error: "Nothing to update. Provide comment or rating.",
    });
  }
  try {
    const result = await pool.query(
      `UPDATE comments
      SET comment = COALESCE($3, comment),
      rating = COALESCE($4, rating)
      WHERE comments.id = $2 AND comments.recipe_id = $1
      AND comments.user_id = $5
      RETURNING *;`,
      [recipeId, commentId, comment, rating || null, userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found or you are not authorised to edit it" });
    }

    res.status(200).json({
      message: "Message been edited successfully",
      updatedComment: result.rows[0],
    });
  } catch (err) {
    console.log("Error updating comment", err);
    res.status(500).json({ error: "Database Error from comments patch" });
  }
}
