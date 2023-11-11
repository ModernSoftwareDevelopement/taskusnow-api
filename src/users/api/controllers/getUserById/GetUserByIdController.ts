import { Request, Response } from 'express';
import { GetUserByIdUseCase } from '../../../useCases/getUserById/GetUserByIdUseCase';

export class GetUserByIdController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const user = await this.getUserByIdUseCase.execute(id);
      res.status(200).json(user);
    } catch (err: unknown) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
