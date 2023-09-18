import { GetTaskDTO } from './../dtos/GetTaskDTO';

export interface GetTaskByTaskIDRepoInterface {
  getTaskByTaskID(taskID: string): Promise<GetTaskDTO>;
}
