import request from "supertest";
import app from "../app.js";

describe("Task Tracker API", () => {
  
  describe("GET /", () => {
    it("should return CI/CD message", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("CI/CD Demo Working!");
    });
  });

  describe("GET /tasks", () => {
    it("should return all tasks", async () => {
      const res = await request(app).get("/tasks");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /tasks/:id", () => {
    it("should return a single task", async () => {
      const res = await request(app).get("/tasks/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id", 1);
    });

    it("should return 404 for non-existent task", async () => {
      const res = await request(app).get("/tasks/999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const res = await request(app)
        .post("/tasks")
        .send({ title: "Test Task" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("title", "Test Task");
    });

    it("should return 400 if title is missing", async () => {
      const res = await request(app)
        .post("/tasks")
        .send({});
      expect(res.statusCode).toBe(400);
    });
  });

});
