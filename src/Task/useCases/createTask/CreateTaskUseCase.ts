import { CreateTaskRepoInterface } from '../../repos/createTask/ICreateTaskRepository';
import { CreateTaskDto } from '../../api/dtos/CreateTaskDTO';
import { Task } from '../../domain/entity/Task';
import { CreateTaskResponse } from './CreateTaskResponse';
import { ValidationError } from '../../../middleware/ValdationError';

export class CreateTaskUseCase {
  constructor(private readonly taskRepo: CreateTaskRepoInterface) {}

  async execute(taskDTO: CreateTaskDto): Promise<CreateTaskResponse> {
    const task = Task.create(taskDTO);

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      const validation = task.taskIsValid();

      if (!validation.valid) {
        throw new ValidationError(
          validation.errors
            ? JSON.stringify(validation.errors)
            : 'Validation failed.'
        );
      }
    }

    try {
      const createdTaskID = await this.taskRepo.createTask(taskDTO);
      return { taskId: createdTaskID };
    } catch (error) {
      throw new Error('Something went wrong. Try again!');
    }
  }
}
