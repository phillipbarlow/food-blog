import { describe, test, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db/pool.js";

test("placeholder", () => {
  expect(true).toBe(true);
});

afterAll(async () => {
  await pool.end();
});
