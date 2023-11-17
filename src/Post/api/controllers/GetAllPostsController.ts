import { Request, Response } from 'express';
import { GetAllPostsUseCase } from '../../useCases/GetAllPostsUseCase';

export class GetAllPostsController {
  constructor(private readonly getAllPostsUseCase: GetAllPostsUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const result = await this.getAllPostsUseCase.execute();
    res.status(200).json(result);
  }
}
