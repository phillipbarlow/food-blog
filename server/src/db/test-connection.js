// src/db/test-connection.js
import { pool } from "./pool.js";

async function testConnection() {
  try {
    console.log("Connecting to the database...");

    const result = await pool.query("SELECT NOW()");
    console.log("✅ Connected! Database time is:", result.rows[0].now);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error);
  } finally {
    await pool.end();
    console.log("Pool closed.");
  }
}

testConnection();
