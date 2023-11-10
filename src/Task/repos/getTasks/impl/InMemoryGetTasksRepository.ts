import { GetTasksRepoInterface } from '../IGetTasksRepository';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';
import { GetTaskDTO } from './../../dtos/GetTaskDTO';

export class InMemoryGetTasksRepository implements GetTasksRepoInterface {
  async getTasks(): Promise<GetTaskDTO[]> {
    return InMemoryTasks;
  }
}
