import { Request, Response } from 'express';
import { GetPostByIDUseCase } from '../../userCases/GetPostByIDUseCase';

export class GetPostByIDController {
  constructor(private readonly getPostByIDUseCase: GetPostByIDUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    //this.getPostByIDUseCase.execute(res, req).catch();
    const { id } = req.body;
    try {
      const post = await this.getPostByIDUseCase.execute(id);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).send('Post not found!');
      }
    } catch (error) {
      const message = (error as Error).message;
      res.status(500).json({ message });
    }
  }
}
