import { Task } from '../../domain/entity/Task';

export interface CreateTaskRepoInterface {
  createTask(taskData: Task): Promise<string>;
}
