import { Request, Response } from 'express';
import { GetTaskByTaskIDUseCase } from './../../../useCases/getTaskByID/GetTaskByTaskIDUseCase';

export class GetTaskbyTaskIDController {
  constructor(
    private readonly getTaskByTaskIDUseCase: GetTaskByTaskIDUseCase,
  ) {}

  async execute(request: Request, response: Response): Promise<void> {
    const taskID = request.query.taskId as string;

    try {
      const task = await this.getTaskByTaskIDUseCase.execute(taskID);
      response.status(200).json(task);
    } catch (err: unknown) {
      response.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
