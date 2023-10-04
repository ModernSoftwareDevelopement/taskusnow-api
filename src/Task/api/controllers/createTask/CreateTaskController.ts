import { CreateTaskUseCase } from '../../../useCases/createTask/CreateTaskUseCase';
import { CreateTaskDTO } from '../../dtos/CreateTaskDTO';
import { Request, Response } from 'express';

export class CreateTaskController {
  constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    const reqTask = request.body as CreateTaskDTO;

    try {
      const res = await this.createTaskUseCase.execute(reqTask);
      response.status(201).json(res);
    } catch (err: unknown) {
      response.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
