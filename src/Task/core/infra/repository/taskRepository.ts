import Task from '../../entity/Task';
import { TaskInterface } from '../interface/taskInterface';

export class TaskRepository implements TaskInterface {
  constructor(private dataSource: TaskInterface) {}

  async getTasks(): Promise<Task[]> {
    return this.dataSource.getTasks();
  }

  async createTask(taskData: Task): Promise<Task> {
    return this.dataSource.createTask(taskData);
  }
}
