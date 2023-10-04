import { GetTaskByTaskIDRepoInterface } from '../IGetTaskByTaskIDRepository';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';
import { GetTaskDTO } from '../../dtos/GetTaskDTO';

export class InMemoryGetTaskByTaskIDRepository
  implements GetTaskByTaskIDRepoInterface
{
  async getTaskByTaskID(taskID: string): Promise<GetTaskDTO> {
    const task = InMemoryTasks.find((t) => t.taskId === taskID) as GetTaskDTO;
    if (!task) {
      throw new Error(`Task with ID ${taskID} not found`);
    }
    return task;
  }
}
