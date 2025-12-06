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
        category: "cooking",
      })
      .set("Content-Type", "application/json");

    const recipeId = recipeRes.body.id;

    const commentRes = await request(app)
      .post(`/recipes/${recipeId}/comments`)
      .send({
        user_name: "Phil",
        comment: "Delete me",
      })
      .set("Content-Type", "application/json");

    const commentId = commentRes.body.id;

    const deleteRes = await request(app).delete(`/comments/${commentId}`);

    expect(deleteRes.status).toBe(200);

    const getAfterDelete = await request(app).get(`/comments/${commentId}`);
    expect(getAfterDelete.status).toBe(404);
  });
});

describe("PATCH comments/:id", () => {
  test("Should edit comment and return success", async () => {
    const recipeRes = await request(app)
      .post("/recipes")
      .send({
        title: "Test Recipe",
        description: "desc",
        image_url: null,
        category: "cooking",
      })
      .set("Content-Type", "application/json");

    const recipeId = recipeRes.body.id;

    const commentRes = await request(app)
      .post(`/recipes/${recipeId}/comments`)
      .send({
        user_name: "Phil",
        comment: "original comment!",
      })
      .set("Content-Type", "application/json");

    const commentId = commentRes.body.id;
    const patchRes = await request(app)
      .patch(`/comments/${commentId}`)
      .send({
        comment: "edited comment!",
      })
      .set("Content-Type", "application/json");
    expect(patchRes.status).toBe(200);

    const updatedRes = patchRes.body.updatedComment;
    expect(updatedRes.comment).toBe("edited comment!");
    expect(updatedRes.user_name).toBe("Phil")
    expect(patchRes.body.message).toBe("Message been edited successfully");
  });
});

afterAll(async () => {
  await pool.end();
});
