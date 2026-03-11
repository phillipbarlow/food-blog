import { pool } from "./pool.js";

export async function getCommentsWithUsers(recipeId) {
  const result = await pool.query(
    `SELECT 
       c.id, c.comment, c.time, c.rating,c.user_id,
       u.username, u.display_name
     FROM comments c
     JOIN users u ON c.user_id = u.id
     WHERE c.recipe_id = $1
     ORDER BY c.id DESC;`,
    [recipeId]
  );

  return result.rows;
}
