import Task from '../../../core/entity/Task';

export interface TaskInterface {
  getTasks(): Promise<Task[]>;
  createTask(taskData: Task): Promise<Task>;  
}
