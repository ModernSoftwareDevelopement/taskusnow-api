import { Task } from '../../domain/entity/Task';

export interface GetTaskByTaskIDRepoInterface {
  getTaskByTaskID(taskID: string): Promise<Task>;
}
