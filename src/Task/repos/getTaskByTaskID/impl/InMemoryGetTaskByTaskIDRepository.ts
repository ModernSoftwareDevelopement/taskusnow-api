import { GetTaskByTaskIDRepoInterface } from '../IGetTaskByTaskIDRepository';
import { Task } from '../../../domain/entity/Task';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';

export class InMemoryGetTaskByTaskIDRepository
  implements GetTaskByTaskIDRepoInterface
{
  async getTaskByTaskID(taskID: string): Promise<Task> {
    const task = InMemoryTasks.find((t) => t.taskId === taskID);
    if (!task) {
      throw new Error(`Task with ID ${taskID} not found`);
    }
    return task;
  }
}
