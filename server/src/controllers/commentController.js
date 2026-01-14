import { pool } from "../db/pool.js";

export async function postComment(req, res) {
  const { user_name, comment } = req.body;
  const recipe_id = req.params.id;

  if (!user_name || !comment) {
    return res.status(400).json({
      error: "Missing fields",
      details: { user_name, comment },
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO comments (recipe_id, user_name, comment)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [recipe_id, user_name, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error inserting comment:", error);
    res.status(500).json({ error: "Database error from comments" });
  }
}

export async function deleteComment(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM comments WHERE recipe_id = $1 RETURNING *`,
      [id]
    );
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
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No comments found" });
    }
    res.json(result.rows);
  } catch (err) {
    console.log("Error getting comments", err);
    res.status(500).json({ error: "Database Error from comments" });
  }
}

export async function updateComment(req, res) {
  const { id } = req.params;
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({
      error: "Missing comment field",
      details: comment,
    });
  }
  try {
    const result = await pool.query(
      `UPDATE comments 
      SET comment = COALESCE($2, comment)
      WHERE id = $1
      RETURNING *`,
      [id, comment]
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
    res.status(500).json({ error: "Database Error from comments" });
  }
}
