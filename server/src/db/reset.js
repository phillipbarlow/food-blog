/* eslint-env node */
import { pool } from "./pool.js";

async function reset() {
  try {
    console.log("Resetting database...");

    await pool.query("DROP TABLE IF EXISTS comments;");
    await pool.query("DROP TABLE IF EXISTS recipes;");
    await pool.query("DROP TABLE IF EXISTS users;");

    await pool.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        display_name TEXT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL
      );
    `);
    await pool.query(`
      CREATE TABLE recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT
        );
        `);

    // 🔽 updated comments schema
    await pool.query(`
          CREATE TABLE comments (
            id SERIAL PRIMARY KEY,
            recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
            user_id INTEGER REFERENCES users(id),
            name TEXT NOT NULL,
            time TEXT NOT NULL,
            comment TEXT NOT NULL,
            avatar TEXT NOT NULL,
            rating INTEGER
            );
            `);

    const userIds = [];

    for (let i = 1; i <= 50; i++) {
      const result = await pool.query(
        `INSERT INTO users (display_name, username, password_hash)
                VALUES ($1, $2, $3)
                RETURNING *;`,
        [`User ${i}`,`user${i}@test.com`, "fake_hash" ],
      );
      userIds.push(result.rows[0].id);
    }

    for (let i = 1; i <= 50; i++) {
      const ingredientsArr = [
        `ingredient${i}`,
        `ingredient${i + 1}`,
        `ingredient${i + 2}`,
      ];
      const instructionsArr = [
        `instruction${i}`,
        `instruction${i + 1}`,
        `instruction${i + 2}`,
      ];
      const ingredientsString = JSON.stringify(ingredientsArr);
      const instructionsString = JSON.stringify(instructionsArr);
      const image = "/default-items-image.png";
      await pool.query(
        `INSERT INTO recipes (title, ingredients, instructions, category, image)
         VALUES ($1, $2, $3, $4, $5);`,
        [
          `title ${i}`,
          ingredientsString,
          instructionsString,
          i % 2 === 0 ? "cooking" : "baking",
          image,
        ],
      );
    }

    // 🔽 updated comment seeding

    for (let i = 1; i <= 50; i++) {
      const recipeId = ((i - 1) % 10) + 1; // spread comments over first 10 recipes
      const userId = userIds[(i - 1) % userIds.length];

      const name = `User ${i}`;
      const time = new Date().toISOString().replace("T", " ").slice(0, 16);
      const comment = `Comment ${i} — this is a seeded comment for recipe ${recipeId}.`;
      const avatar = "/user.png";
      const rating = ((i - 1) % 5) + 1; // 1–5

      await pool.query(
        `INSERT INTO comments (recipe_id, user_id, name, time, comment, avatar, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7);`,
        [recipeId, userId, name, time, comment, avatar, rating ],
      );
    }

    console.log("Done.");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

reset();
