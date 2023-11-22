import { CreateTaskDto } from '../dtos/CreateTaskDTO';

export interface CreateTaskRepoInterface {
  createTask(taskData: CreateTaskDto): Promise<string>;
}
