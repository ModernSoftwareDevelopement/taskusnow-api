import { Task } from "../../entity/Task";
import { InMemoryDataSource } from "../datasource/inMemoryTask";

function getTestNewTask(): Task {
  return new Task({
    title: "Test Title",
    description: "Test Description",
    userid: 1,
  });
}

describe("InMemoryDataSource Tests", () => {
  let inMemoryDataSource: InMemoryDataSource;

  beforeEach(() => {
    inMemoryDataSource = new InMemoryDataSource();
  });

  it("returns an empty array for getTasks initially", async () => {
    const tasks = await inMemoryDataSource.getTasks();

    expect(tasks).toEqual([]);
  });

  it("adds a task to the tasks array when createTask is called", async () => {
    const newTask: Task = getTestNewTask();

    const createdTask = await inMemoryDataSource.createTask(newTask);
    const tasks = await inMemoryDataSource.getTasks();

    expect(createdTask.title).toEqual("Test Title");
    expect(createdTask.description).toEqual("Test Description");
    expect(tasks.length).toEqual(1);
  });

  it("returns a task with valid taskID", async () => {
    const newTask: Task = getTestNewTask();

    const createdTask = await inMemoryDataSource.createTask(newTask);
    const getTask = await inMemoryDataSource.getTaskByTaskID(
      createdTask.taskId as string
    );

    expect(getTask.taskId).toEqual(createdTask.taskId);
  });

  it("returns an error task not found with invalid taskID", async () => {
    const taskID: string = "invalidTaskID";
    const newTask: Task = getTestNewTask();

    await inMemoryDataSource.createTask(newTask);

    try {
      await inMemoryDataSource.getTaskByTaskID(taskID);
    } catch (error) {
      
      const typedError = error as Error;
      expect(typedError.message).toBe(`Task with ID ${taskID} not found`);
    }
  });
});
