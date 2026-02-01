import { pool } from "../db/pool.js";

export async function postComment(req, res) {
  const recipeId = req.params.id;
  const { userId = 1, name = "phil", comment, rating } = req.body;

  const time = new Date().toISOString().replace("T", " ").slice(0, 16);
  const avatar = "/user.png";

  // if (!recipeId || !userId || !name || !comment) {
  //   return res.status(400).json({
  //     error: "Missing required fields",
  //     details: { recipeId, userId, name, comment, rating },
  //   });
  // }

  // default validation while auth is not set
  if (!recipeId || !comment) {
    return res.status(400).json({
      error: "Missing required fields",
      details: { recipeId, userId, name, comment, rating },
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
    res.status(500).json({ error: "Database error from comments" });
  }
}

export async function deleteComment(req, res) {
  const { id } = req.params;
  const commentId = Number(id);

  // ✅ sanity check: must be a real integer
  // if (!Number.isInteger(commentId)) {
  //   return res.status(400).json({ error: "Invalid comment id" });
  // }
  try {
    const result = await pool.query(
      `DELETE FROM comments WHERE comments.id = $1 RETURNING *`,
      [commentId],
    );

    // console.log(result)
    res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment: result.rows[0],
    });
  } catch (err) {
    console.log("Database error deleting comment", err);
    res.status(500).json({ error: "Database error from comments" });
  }
}

export async function getAllComments(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM comments WHERE recipe_id = $1 ORDER BY id DESC`,
      [id],
    );
    return res.json(result.rows);
  } catch (err) {
    console.log("Error getting comments", err);
    res.status(500).json({ error: "Database Error from comments" });
  }
}

export async function updateComment(req, res) {
  const { id, commentId } = req.params;
  const { comment, rating} = req.body;
// console.log(id,commentId)
  if (!comment) {
    return res.status(400).json({
      error: "Missing comment field",
      details: comment,
    });
  }
  try {
    const result = await pool.query(
      `UPDATE comments
      SET comment = COALESCE($1, comment),
      rating = COALESCE($2, rating)
      WHERE comments.id = $3 AND recipe_id = $4
      RETURNING *;`,
      [comment, rating || null, commentId, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
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
