import { describe, test, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db/pool.js";



afterAll(async () => {
  await pool.end();
});
