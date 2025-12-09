// src/db/setup.js
import { pool } from "./pool.js";

async function setup() {
  try {
    console.log("Running DB setup...");
    console.log("Users table created (or already exists).");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recipes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
  ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS category TEXT;
`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  recipe_id INTEGER NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
    `);

    console.log("✅ Tables created / verified.");
  } catch (error) {
    console.error("❌ Setup failed:", error);
  } finally {
    await pool.end();
    console.log("Pool closed.");
  }
}

setup();
