import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { Request, Response } from 'express';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const userDTO: CreateUserDTO = {
      email,
    };

    try {
      const userResponse = await this.createUserUseCase.execute(userDTO);
      res.status(201).json(userResponse);
    } catch (err: unknown) {
      res.status(500).json({
        message: (err as Error).message,
      });
    }
  }
}
