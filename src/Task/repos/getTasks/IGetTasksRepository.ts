import { GetTaskDto } from '../dtos/GetTaskDTO';

export interface GetTasksRepoInterface {
  getTasks(): Promise<GetTaskDto[]>;
}
