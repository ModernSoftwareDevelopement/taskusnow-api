import { Task } from "../../entity/Task";
import { TaskRepoInterface } from "../interface/TaskRepoInterface";
import { TaskRepository } from "./taskRepository";

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

function getNewSampleTask (): Task {
  return new Task({
    title: "Sample Title",
    description: "Sample Description",
    userid: 123,
  });
}

describe("TaskRepository", () => {
  let taskRepository: TaskRepository;

  beforeEach(() => {
    const mockDataSource = new MockDataSource();
    taskRepository = new TaskRepository(mockDataSource);
  });

  it("should get an empty list of tasks", async () => {
    const tasks = await taskRepository.getTasks();

    expect(tasks).toEqual([]);
  });

  it("should create a task", async () => {
    const newTaskData = getNewSampleTask();
    
    const createdTask = await taskRepository.createTask(newTaskData);

    expect(createdTask.title).toEqual('Sample Title');
    expect(createdTask.description).toEqual('Sample Description');
    expect(createdTask.userid).toEqual(123);
  });

  it("should get a task with valid taskID", async () => {
    const newTaskData = getNewSampleTask();

    const createdTask = await taskRepository.createTask(newTaskData);
    const getTask = await taskRepository.getTaskByTaskID(createdTask.taskId as string);

    expect(getTask.taskId).toBe(createdTask.taskId);
  });
});
