import { Task }  from '../../entity/Task';

export interface TaskRepoInterface {
  getTasks(): Promise<Task[]>;
  createTask(taskData: Task): Promise<Task>;
  getTaskByTaskID(taskID: string): Promise<Task>;
}
