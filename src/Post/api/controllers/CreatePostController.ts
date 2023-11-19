import { Request, Response } from 'express';
import { CreatePostUseCase } from '../../useCases/CreatePostUseCase';
import { CreatePostDTO } from '../dtos/CreatePostDTO';

export class CreatePostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const { post } = req.body;

    const postDTO: CreatePostDTO = { ...post };

    try {
      const createdPost = await this.createPostUseCase.execute(postDTO);
      res.status(201).json(createdPost);
    } catch (error) {
      const message = (error as Error).message;
      res.status(500).json({ message });
    }
  }
}
