import { Response } from 'express';
import { GetAllPostsUseCase } from '../../useCases/GetAllPostsUseCase';

export class GetAllPostsController {
  constructor(private readonly getAllPostsUseCase: GetAllPostsUseCase) {}

  async execute(res: Response): Promise<void> {
    const result = await this.getAllPostsUseCase.execute();
    console.log('result', result);
    res.status(200).json(result);
  }
}
