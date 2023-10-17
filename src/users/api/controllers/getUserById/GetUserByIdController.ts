import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../../useCases/getUserById/GetUserByIdUseCase';

export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      const user = await this.getUserByIdUseCase.execute(id);
      response.status(200).json(user);
    } catch (err: unknown) {
      response.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
