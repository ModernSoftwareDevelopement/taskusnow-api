import { GetTasksResponse } from './GetTasksResponse';
import { GetTasksRepoInterface } from '../../repos/getTasks/IGetTasksRepository';

export class GetTasksUseCase {
  constructor(private readonly taskRepo: GetTasksRepoInterface) {}

  async execute(): Promise<GetTasksResponse> {
    const resultTask = await this.taskRepo.getTasks();
    return {
      tasks: resultTask,
    };
  }
}
