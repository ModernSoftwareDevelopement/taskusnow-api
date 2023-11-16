import { GetTaskDTO } from '../dtos/GetTaskDTO';

export interface GetTasksRepoInterface {
  getTasks(): Promise<GetTaskDTO[]>;
}
