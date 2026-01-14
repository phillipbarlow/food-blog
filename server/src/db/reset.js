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
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        display_name TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        category TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE comments (
        id SERIAL PRIMARY KEY,
        recipe_id INTEGER REFERENCES recipes(id),
        user_id INTEGER REFERENCES users(id),
        comment TEXT NOT NULL
      );
    `);

    const userIds = [];

    for (let i = 1; i <= 50; i++) {
      const result = await pool.query(
        `INSERT INTO users (email, password_hash, display_name)
         VALUES ($1, $2, $3)
         RETURNING id;`,
        [`user${i}@test.com`, "fake_hash", `User ${i}`]
      );
      userIds.push(result.rows[0].id);
    }

    for (let i = 1; i <= 50; i++) {
      await pool.query(
        `INSERT INTO recipes (title, description, image_url, category)
         VALUES ($1, $2, $3, $4);`,
        [
          `Recipe ${i}`,
          `Description ${i}`,
          `https://example.com/${i}.jpg`,
          i % 2 === 0 ? "cooking" : "baking",
        ]
      );
    }

    for (let i = 1; i <= 50; i++) {
      await pool.query(
        `INSERT INTO comments (recipe_id, user_id, comment)
         VALUES ($1, $2, $3);`,
        [
          i,
          userIds[i - 1],
          `Comment ${i}`,
        ]
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
