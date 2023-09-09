import { Task } from "../../entity/Task";
import { TaskRepoInterface } from "../interface/TaskRepoInterface";
import { v4 as uuidv4 } from "uuid";

export class InMemoryDataSource implements TaskRepoInterface {
  private tasks: Task[] = [];

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(taskData: Task): Promise<Task> {
    const taskID: string = uuidv4();

    taskData.taskId = taskID;

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
