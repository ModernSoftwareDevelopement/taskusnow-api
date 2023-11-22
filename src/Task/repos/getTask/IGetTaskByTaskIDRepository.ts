import { GetTaskDto } from '../dtos/GetTaskDTO';

export interface GetTaskByTaskIDRepoInterface {
  getTaskByTaskID(taskID: string): Promise<GetTaskDto>;
}
