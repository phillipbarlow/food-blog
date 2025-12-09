import { describe, test, expect, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../src/app.js";
import { pool } from "../src/db/pool.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "testsecret";
process.env.JWT_SECRET = JWT_SECRET;
function makeToken() {
  return jwt.sign({ id: 1 }, JWT_SECRET, { expiresIn: "1d" });
}

const token = makeToken();

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
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const recipeId = recipeRes.body.id;

    const commentRes = await request(app)
      .post(`/recipes/${recipeId}/comments`)
      .send({
        user_name: "Phil",
        comment: "Delete me",
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentRes.body.id;
    expect(commentId).toBeDefined();
    expect(commentRes.status).toBe(201);
    const deleteRes = await request(app)
      .delete(`/comments/${commentId}`)
      .set("Authorization", `Bearer ${token}`);

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
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const recipeId = recipeRes.body.id;

    const commentRes = await request(app)
      .post(`/recipes/${recipeId}/comments`)
      .send({
        user_name: "Phil",
        comment: "original comment!",
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    const commentId = commentRes.body.id;
    console.log(commentId, "---line 74");
    const patchRes = await request(app)
      .patch(`/comments/${commentId}`)
      .send({
        comment: "edited comment!",
      })
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${token}`);

    expect(patchRes.status).toBe(200);
    const updatedRes = patchRes.body.updatedComment;
    expect(updatedRes.comment).toBe("edited comment!");
    expect(updatedRes.user_name).toBe("Phil");
    expect(patchRes.body.message).toBe("Message been edited successfully");
  });
});

afterAll(async () => {
  await pool.end();
});
