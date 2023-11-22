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
      user: {
        userId: resultTask.user.userId,
        fullName: resultTask.user.fullName,
      },
      category: resultTask.category,
      location: resultTask.location,
      budget: resultTask.budget,
      scheduling: resultTask.scheduling,
      timeslot: resultTask.timeslot,
      createdAt: resultTask.createdAt
    };
  }
}
