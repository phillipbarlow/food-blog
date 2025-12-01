import { pool } from "../db/pool.js";

export async function postComment(req, res) {
  const { recipe_id, user_name, comment } = req.body;
  console.log("✅ Reached POST /comments route, body:", req.body);
  if (!recipe_id) {
    return res.status(400).json({ error: "id is required" });
  }
  if (!recipe_id || !user_name || !comment) {
    return res.status(400).json({
      error: "Missing fields",
      details: { recipe_id, user_name, comment },
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

export async function deleteComment(req,res){
  const {id} = req.params;
  try{
    const result = await pool.query(
      `DELETE FROM comments WHERE id = $1 RETURNING *`,[id]
    )
    res.status(200).json({message: "Comment deleted successfully", deletedComment:result.rows[0]})
  }catch(err){
    console.log("Database error deleting comment", err)
  }
}
