import { describe, test, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db/pool.js";

describe("DELETE comments/:id", () => {
  test("Should delete comment and return success", async () => {
     const recipeRes = await request(app)
      .post("/recipes")
      .send({
        title: "Test Recipe",
        description: "desc",
        image_url: null,
        category: "cooking"
      })
      .set("Content-Type", "application/json");

    const recipeId = recipeRes.body.id;

    const commentRes = await request(app)
      .post(`/recipes/${recipeId}/comments`)
      .send({
        user_name: "Phil",
        comment: "Delete me"
      })
      .set("Content-Type", "application/json");

    const commentId = commentRes.body.id;

    const deleteRes = await request(app).delete(`/comments/${commentId}`);

    expect(deleteRes.status).toBe(200);

    const getAfterDelete = await request(app).get(`/comments/${commentId}`); 
    expect(getAfterDelete.status).toBe(404);
  
  });
});

afterAll(async () => {
  await pool.end();
});
