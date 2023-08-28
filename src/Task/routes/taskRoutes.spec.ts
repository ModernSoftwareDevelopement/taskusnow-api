import supertest from "supertest";
import express, { Express } from "express";
import setupTaskRoutes from "./taskRoutes";
import { TaskService } from "../core/infra/service/taskService";

const createRequester = (taskServiceMock: Partial<TaskService>) => {  
  const app: Express = express();
  app.use(express.json());
  app.use("/api", setupTaskRoutes(taskServiceMock as TaskService));
  return supertest(app);
};

describe("Task API", () => {
  beforeEach(() => {    
    jest.resetAllMocks();
  });

  describe("POST /api/task", () => {
    it("POST /api/task should create a task and return it", async () => {
      
      const mockTaskService: Partial<TaskService> = {
        createTask: jest.fn().mockResolvedValue({"title":"New title","description":"Sample Description","userid": 123}),
      };
  
      const requester = createRequester(mockTaskService);
  
      const newTaskData = {
        title: "New title",
        description: "Sample Description",
        userid: 123,
      };
  
      const response = await requester.post("/api/task").send(newTaskData);      
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({"title":"New title","description":"Sample Description","userid": 123});    
  
      expect(mockTaskService.createTask).toHaveBeenCalled();
    });
  })

  describe("GET /api/tasks", () => {
    it("GET /api/tasks should return response", async () => {
      
      const mockTaskService: Partial<TaskService> = {
        getTasks: jest.fn().mockResolvedValue([]),         
      };
  
      const requester1 = createRequester(mockTaskService);
  
      const response = await requester1.get("/api/tasks");    
  
      expect(response.status).toBe(200);
      expect(mockTaskService.getTasks).toHaveBeenCalled();
    });
  })


  
});
