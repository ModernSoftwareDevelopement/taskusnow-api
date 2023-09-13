import { Task } from "../../entity/Task";
import { TaskService } from "./taskService";
import { TaskRepoInterface } from "../interface/TaskRepoInterface";
import { ValidationError } from "../../../middleware/ValdationError";

class MockDataSource implements TaskRepoInterface {
  private tasks: Task[] = [];

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(taskData: Task): Promise<Task> {
    this.tasks.push(taskData);
    return taskData;
  }

  async getTaskByTaskID(taskID: string): Promise<Task> {
    const task = this.tasks.find((t) => t.taskId === taskID);
    if (!task) {
      throw new Error(`Task with ID ${taskID} not found`);
    }
    return task;
  }
}

class MockTaskRepository implements TaskRepoInterface {
  private tasks: Task[] = [];

  constructor(private dataSource: MockDataSource) {}

  async getTasks(): Promise<Task[]> {
    return this.dataSource.getTasks();
  }

  async createTask(taskData: Task): Promise<Task> {
    this.tasks.push(taskData);
    return taskData;
  }

  async getTaskByTaskID(taskID: string): Promise<Task> {
    const task = this.tasks.find((t) => t.taskId === taskID);
    if (!task) {
      throw new Error(`Task with ID ${taskID} not found`);
    }
    return task;
  }
}

function getNewSampleTask (): Task {
  return new Task({
    title: "Sample Title",
    description: "Sample Description",
    userid: 123,
  });
}

describe("TaskService", () => {
  let taskService: TaskService;

  beforeEach(() => {
    const mockDataSource = new MockDataSource();
    const mockTaskRepository = new MockTaskRepository(mockDataSource);    
    taskService = new TaskService(mockTaskRepository);
  });

  it("should get an empty list of tasks", async () => {
    const tasks = await taskService.getTasks();

    expect(tasks).toEqual([]);
  });

  it("should create a task with valid data", async () => {
    const newTaskData = getNewSampleTask();
    const createdTask = await taskService.createTask(newTaskData);
    
    expect(createdTask).toEqual({
      title: "Sample Title",
      description: "Sample Description",
      userid: 123,
    });
  });

  it("should throw an error when creating a task with invalid data", async () => {
    const invalidTaskData = new Task({
      title: "",
      description: "Sample Description",
      userid: 123,
    });

    try {
      await taskService.createTask(invalidTaskData);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.message).toBe("Empty or invalid title or description");
      } else {
        throw error;
      }
    }
  });

  it("should throw an error when creating a task with invalid userid", async () => {
    const invalidTaskData = new Task({
      title: "New Task",
      description: "Sample Description",
      userid: 123,
    });    

    try {
      await taskService.createTask(invalidTaskData);
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        expect(error.message).toBe("Invalid userid");
      } else {
        throw error;
      }
    }
  });

  it("should get the task with valid taskID", async () => {
    const newTaskData = getNewSampleTask()
    
    const createdTask = await taskService.createTask(newTaskData);
    const getTask = await taskService.getTaskByTaskID(createdTask.taskId as string);
    
    expect(getTask.taskId).toBe(createdTask.taskId);
  });

});
