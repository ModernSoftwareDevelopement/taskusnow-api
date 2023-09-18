import { GetTaskByTaskIDResponse } from './GetTaskByTaskIDResponse';
import { GetTaskByTaskIDRepoInterface } from '../../repos/getTaskByTaskID/IGetTaskByTaskIDRepository';

export class GetTaskByTaskIDUseCase {
  constructor(private readonly taskRepo: GetTaskByTaskIDRepoInterface) {}

  async execute(taskId: string): Promise<GetTaskByTaskIDResponse> {
    try {
      const resultTask = await this.taskRepo.getTaskByTaskID(taskId);

      if (!resultTask) {
        throw new Error('Task not found!');
      }

      return {
        taskId: resultTask.taskId as string,
        title: resultTask.title,
        description: resultTask.description,
        userid: resultTask.userid,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
