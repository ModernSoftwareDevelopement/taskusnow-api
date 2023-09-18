import { GetTasksResponse } from './GetTasksResponse';
import { GetTasksRepoInterface } from '../../repos/getTasks/IGetTasksRepository';

export class GetTasksUseCase {
  constructor(private readonly taskRepo: GetTasksRepoInterface) {}

  async execute(): Promise<GetTasksResponse> {
    try {
      const resultTask = await this.taskRepo.getTasks();
      return {
        tasks: resultTask,
      };
    } catch (error) {
      throw new Error('Something went wrong. Try again!');
    }
  }
}
