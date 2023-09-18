import { GetTasksRepoInterface } from '../IGetTasksRepository';
import { Task } from '../../../domain/entity/Task';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';

export class InMemoryGetTasksRepository implements GetTasksRepoInterface {
  async getTasks(): Promise<Task[]> {
    return InMemoryTasks;
  }
}
