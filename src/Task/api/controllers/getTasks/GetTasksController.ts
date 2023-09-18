import { Request, Response } from 'express';
import { GetTasksUseCase } from '../../../useCases/getTasks/GetTasksUseCase';

export class GetTasksController {
  constructor(private readonly getTasksUseCase: GetTasksUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const tasks = await this.getTasksUseCase.execute();
      response.status(200).json(tasks);
    } catch (err: unknown) {
      response.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
