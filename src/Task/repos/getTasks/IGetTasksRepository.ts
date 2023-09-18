import { Task } from '../../domain/entity/Task';

export interface GetTasksRepoInterface {
  getTasks(): Promise<Task[]>;
}
