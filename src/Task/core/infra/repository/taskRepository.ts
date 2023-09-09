import { Task }  from '../../entity/Task';
import { TaskRepoInterface } from '../interface/TaskRepoInterface';

export class TaskRepository implements TaskRepoInterface {
  constructor(private dataSource: TaskRepoInterface) {}

  async getTasks(): Promise<Task[]> {
    return this.dataSource.getTasks();
  }

  async createTask(taskData: Task): Promise<Task> {
    return this.dataSource.createTask(taskData);
  }

  async getTaskByTaskID(taskID: string): Promise<Task> {
    return this.dataSource.getTaskByTaskID(taskID);
  }
}
