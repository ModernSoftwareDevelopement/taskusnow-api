import { Request, Response } from 'express';
import { CreatePostUseCase } from '../../userCases/CreatePostUseCase';
import { CreatePostDTO } from '../dtos/CreatePostDTO';
import { create } from 'domain';

export class CreatePostController {
  constructor(private readonly createPostUseCase: CreatePostUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const { post } = req.body;

    const postDTO = new CreatePostDTO(post);

    try {
      const createdPost = await this.createPostUseCase.execute(post);
      res.status(201).json(createdPost);
    } catch (error) {
      const message = (error as Error).message;
      res.status(500).json({ message });
    }
  }
}
