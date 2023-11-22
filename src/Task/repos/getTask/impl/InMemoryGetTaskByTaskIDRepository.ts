import { GetTaskByTaskIDRepoInterface } from '../IGetTaskByTaskIDRepository';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';
import { GetTaskDto } from '../../dtos/GetTaskDTO';

export class InMemoryGetTaskByTaskIDRepository
  implements GetTaskByTaskIDRepoInterface
{
  async getTaskByTaskID(taskID: string): Promise<GetTaskDto> {
    const task = InMemoryTasks.find((t) => t.taskId === taskID) as GetTaskDto;
    if (!task) {
      throw new Error(`Task with ID ${taskID} not found`);
    }
    return task;
  }
}
