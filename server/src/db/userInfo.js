import { pool } from "./pool.js";

// export async function getRecipeCardInfo() {
//   const result = await pool.query(
//     `SELECT
//       r.id,
//       r.title,
//       r.image,
//       r.likes,
//       COUNT(c.id)::int AS comment_count
//     FROM recipes r
//     LEFT JOIN comments c ON c.recipe_id = r.id
//     GROUP BY r.id, r.title, r.image, r.likes
//     ORDER BY r.id DESC;`,
//   );

//   return result.rows;
// }


export async function getRecipeCardInfo() {
  const result = await pool.query(
    `SELECT * FROM recipes ORDER BY id DESC`,
  );

  return result.rows;
}
