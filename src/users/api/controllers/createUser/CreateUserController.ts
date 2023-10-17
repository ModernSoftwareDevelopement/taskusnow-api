import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    const { email } = request.body;
    const userDTO: CreateUserDTO = {
      email,
    };

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
