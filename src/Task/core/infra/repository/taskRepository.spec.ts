import { Task } from "../../entity/Task";
import { TaskInterface } from "../interface/taskInterface";
import { TaskRepository } from "./taskRepository";

class MockDataSource implements TaskInterface {
  private tasks: Task[] = [];

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(taskData: Task): Promise<Task> {
    this.tasks.push(taskData);
    return taskData;
  }
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
    const newTaskData = new Task("Sample Title", "Sample Description", 123);
    const createdTask = await taskRepository.createTask(newTaskData);

    expect(createdTask).toEqual({
      title: "Sample Title",
      description: "Sample Description",
      userid: 123,
    });
  });
});
