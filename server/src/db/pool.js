// src/db/pool.js
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

// console.log("DATABASE_URL:", process.env.DATABASE_URL);
// console.log("PGPASSWORD type:", typeof process.env.PGPASSWORD);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
