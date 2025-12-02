import { describe, test, expect, afterAll } from "@jest/globals";
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

describe("GET /recipes?category=cooking", () => {
  test("Should return a list of category recipes", async () => {
    const res = await request(app).get("/recipes?category=cooking");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(Array.isArray(res.body)).toBe(true);

    for (const recipe of res.body) {
      expect(recipe.category).toBe("cooking");
    }
  });
});
describe("GET /recipes?category=baking", () => {
  test("Should return a list of category baking", async () => {
    const res = await request(app).get("/recipes?category=baking");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(Array.isArray(res.body)).toBe(true);

    for (const recipe of res.body) {
      expect(recipe.category).toBe("baking");
    }
  });
});

describe("GET /recipes/:id", () => {
  test("Should return a single recipe", async () => {
    const res = await request(app).get("/recipes/1");
    const noRes = await request(app).get("/recipes/999");

    expect(res.status).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(res.body).not.toBeNull();
    expect(noRes.status).toBe(404);

    const recipe = res.body;
    expect(recipe.id).toBe(1);
    expect(typeof recipe.title).toBe("string");
  });
});
describe("GET /recipes/999", () => {
  test("Should return 404 when recipe does not exist", async () => {
    const res = await request(app).get("/recipes/999");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Recipe not found");
  });
});

describe("GET /recipes/:id/comments", () => {
  test("Should return comments", async () => {
    const res = await request(app).get("/recipes/1/comments");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    const comment = res.body[0];
    expect(comment).toHaveProperty("comment");
    expect(comment).toHaveProperty("created_at");
    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("user_name");
    expect(comment).toHaveProperty("recipe_id");
  });
});

describe("POST /recipes", () => {
  test("Should create and return posted recipe", async () => {
    const newRecipe = {
      title: "Test Recipe",
      description: "This is a test",
      image_url: "https://test.com/test.jpg",
      category: "cooking",
    };
    const res = await request(app)
      .post("/recipes")
      .send(newRecipe)
      .set("Content-Type", "application/json");
    console.log(res.status, res.body, "--- POST /recipes response ---");
    const recipe = res.body;
    expect(res.status).toBe(201);
    expect(recipe).toHaveProperty("id");
    expect(recipe).toHaveProperty("title");
    expect(recipe).toHaveProperty("description");
    expect(recipe).toHaveProperty("image_url");
    expect(recipe).toHaveProperty("category");
  });
});

describe("POST recipes/:id/comments", () => {
  test("Should return a posted comment", async () => {

    const newComment = {
      title: "Test Recipe",
      description: "This is a test",
      image_url: "https://test.com/test.jpg",
      category: "cooking",
    };
    const res = await request(app)
      .post("/recipes/:id/comments")
      .send(newComment)
      .set("Content-Type", "application/json");
    // recipe_id, user_name, comment
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    const recipe = res.body[0];

    expect(recipe).toHaveProperty("id");
    expect(recipe).toHaveProperty("recipe_id");
    expect(recipe).toHaveProperty("user_name");
    expect(recipe).toHaveProperty("comment");
  });
});

describe("DELETE /recipes/:id", () => {
  test("Should delete recipe and return success", async () => {
    const newRecipe = {
      title: "Recipe To Delete",
      description: "Delete me",
      image_url: "https://test.com/delete.jpg",
      category: "cooking",
    };

    const createRes = await request(app)
      .post("/recipes")
      .send(newRecipe)
      .set("Content-Type", "application/json");

    const recipeId = createRes.body.id;

    const deleteRes = await request(app).delete(`/recipes/${recipeId}`);

    expect(deleteRes.status).toBe(200);

    const getRes = await request(app).get(`/recipes/${recipeId}`);

    expect(getRes.status).toBe(404);
  });
});
afterAll(async () => {
  await pool.end();
});
