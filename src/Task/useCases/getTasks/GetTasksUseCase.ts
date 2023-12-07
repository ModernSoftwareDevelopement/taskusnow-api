import { GetTaskDto } from '../../repos/dtos/GetTaskDTO';
import { GetTasksRepoInterface } from '../../repos/getTasks/IGetTasksRepository';

export class GetTasksUseCase {
  constructor(private readonly taskRepo: GetTasksRepoInterface) {}

  async execute(): Promise<GetTaskDto[]> {
    const resultTask = await this.taskRepo.getTasks();
    return resultTask;
  }
}
