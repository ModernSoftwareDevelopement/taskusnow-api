import { GetTaskByTaskIDResponse } from './GetTaskByTaskIDResponse';
import { GetTaskByTaskIDRepoInterface } from '../../repos/getTask/IGetTaskByTaskIDRepository';

export class GetTaskByTaskIDUseCase {
  constructor(private readonly taskRepo: GetTaskByTaskIDRepoInterface) {}

  async execute(taskId: string): Promise<GetTaskByTaskIDResponse> {
    const resultTask = await this.taskRepo.getTaskByTaskID(taskId);

    return {
      taskId: resultTask.taskId as string,
      title: resultTask.title,
      description: resultTask.description,
      userid: resultTask.userid,
    };
  }
}
