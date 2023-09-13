import request from "supertest";
import express, { Express } from "express";
import { setupTaskRoutes } from "./taskRoutes";
import { TaskService } from "../core/infra/service/taskService";
import { ValidationError } from "../middleware/ValdationError";

const taskServiceMock: Partial<TaskService> = {
  getTasks: jest.fn(),
  createTask: jest.fn(),
  getTaskByTaskID: jest.fn(),
};

const app: Express = express();
app.use(express.json());
app.use("/api", setupTaskRoutes(taskServiceMock as TaskService));

const getTaskMock = taskServiceMock.getTasks as jest.Mock;
const createTaskMock = taskServiceMock.createTask as jest.Mock;
const getTaskMockbyTaskID = taskServiceMock.getTaskByTaskID as jest.Mock;

describe("Task API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /api/tasks", () => {
    it("GET /api/tasks should return response", async () => {
      getTaskMock.mockResolvedValue([]);

      const response = await request(app).get("/api/tasks");

      expect(response.status).toBe(200);
      expect(taskServiceMock.getTasks).toHaveBeenCalled();
    });
  });

  describe("GET /api/tasks", () => {
    it("GET /api/tasks should return error", async () => {
      getTaskMock.mockRejectedValue(new Error("Error"));

      const response = await request(app).get("/api/tasks");

      expect(response.status).toBe(500);
      expect(taskServiceMock.getTasks).toHaveBeenCalled();
    });
  });

  describe("POST /api/task", () => {
    it("POST /api/task should create a task and return it", async () => {
      createTaskMock.mockResolvedValue({
        title: "New title",
        description: "Sample Description",
        userid: 123,
      });

      const response = await request(app).post("/api/task");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        title: "New title",
        description: "Sample Description",
        userid: 123,
      });
      expect(taskServiceMock.createTask).toHaveBeenCalled();
    });
  });

  describe("POST /api/task", () => {
    it("POST /api/task should return 400 Bad request when title is empty", async () => {
      createTaskMock.mockRejectedValue(new ValidationError("Error"));

      const response = await request(app).post("/api/task");

      expect(response.status).toBe(400);
      expect(response.body.error).toEqual("Bad request");
      expect(taskServiceMock.createTask).toHaveBeenCalled();
    });
  });

  describe("GET /api/task", () => {
    it("GET /api/task should return 200 status code", async () => {
      getTaskMockbyTaskID.mockResolvedValue({
        title: "New title",
        description: "Sample Description",
        userid: 123,
      });

      const taskID = "be1bfd97-4c9e-4613-b855-94c1baef1cfa";
      const response = await request(app).get(`/api/task?taskID=${taskID}`);

      expect(response.status).toBe(200);
      expect(taskServiceMock.getTaskByTaskID).toHaveBeenCalled();
    });
  });

  describe("GET /api/task", () => {
    it("GET /api/task should return 404 status code when taskID is invalid", async () => {
      getTaskMockbyTaskID.mockImplementation(() => {
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
        
        response.status(404).json({ error: 'Task not found' });
      });

      const taskID = "invalidTaskID";
      const response = await request(app).get(`/api/task?taskID=${taskID}`);
      
      expect(response.status).toBe(404);
      expect(taskServiceMock.getTaskByTaskID).toHaveBeenCalled();
    });
  });
});
