import { describe, test, expect } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db/pool.js";

describe("GET /recipes", () => {
  test("Should return a list of recipes", async () => {
    const res = await request(app).get("/recipes");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    const recipe = res.body[0];
    expect(recipe).toHaveProperty("id");
    expect(recipe).toHaveProperty("title");
    expect(recipe).toHaveProperty("description");
    expect(recipe).toHaveProperty("image_url");
    expect(recipe).toHaveProperty("category");
  });
});

afterAll(async () => {
  await pool.end();
});
