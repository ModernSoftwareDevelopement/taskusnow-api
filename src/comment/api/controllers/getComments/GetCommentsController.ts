import { Request, Response } from 'express';
import { GetCommentsUseCase } from '../../../useCases/getComments/GetCommentsUseCase';

export class GetCommentsController {
  constructor(private readonly getCommentsUseCase: GetCommentsUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    try {
      const tasks = await this.getCommentsUseCase.execute();
      response.status(200).json(tasks);
    } catch (err: unknown) {
      response.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
