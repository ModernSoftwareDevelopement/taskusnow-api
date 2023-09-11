import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    const userDTO = request.body;

    try {
      const userResponse = await this.createUserUseCase.execute(userDTO);
      response.status(201).json(userResponse);
    } catch (err: unknown) {
      response.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
