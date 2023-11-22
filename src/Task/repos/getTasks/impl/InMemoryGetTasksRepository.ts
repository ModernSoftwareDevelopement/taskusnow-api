import { GetTasksRepoInterface } from '../IGetTasksRepository';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';
import { GetTaskDto } from './../../dtos/GetTaskDTO';

export class InMemoryGetTasksRepository implements GetTasksRepoInterface {
  async getTasks(): Promise<GetTaskDto[]> {
    return InMemoryTasks;
  }
}
