import { CreateTaskRepoInterface } from '../../repos/createTask/ICreateTaskRepository';
import { CreateTaskDTO } from '../../api/dtos/CreateTaskDTO';
import { Task } from '../../domain/entity/Task';
import { CreateTaskResponse } from './CreateTaskResponse';
import { ValidationError } from '../../../middleware/ValdationError';

export class CreateTaskUseCase {
  constructor(private readonly taskRepo: CreateTaskRepoInterface) {}

  async execute(taskDTO: CreateTaskDTO): Promise<CreateTaskResponse> {
    const task = new Task(taskDTO);
    const validation = task.taskIsValid();

    if (!validation.valid) {
      throw new ValidationError(validation.error);
    }

    try {
      const createdTaskID = await this.taskRepo.createTask(task);
      return { taskId: createdTaskID };
    } catch (error) {
      throw new Error('Something went wrong. Try again!');
    }
  }
}
