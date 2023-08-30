import { Task } from '../../entity/Task';
import { TaskInterface } from '../interface/taskInterface';

export class InMemoryDataSource implements TaskInterface {
  private tasks: Task[] = [];

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(taskData: Task): Promise<Task> {
    this.tasks.push(taskData);
    return taskData;
  }
}
  