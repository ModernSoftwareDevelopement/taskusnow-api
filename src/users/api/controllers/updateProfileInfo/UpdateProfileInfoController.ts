import { Request, Response } from 'express';
import { UpdateUserProfileUseCase } from '../../../useCases/uploadUserProfile/UpdateUserProfileUseCase';
import { UpdateUserDto } from '../../dtos/UpdateUserDto';

export class UpdateProfileInfoController {
  constructor(
    private readonly updateUseProfileUseCase: UpdateUserProfileUseCase,
  ) {}

  async execute(req: Request, res: Response): Promise<Response> {
    const userId = req.auth?.payload.my_api_user_id as string;

    if (!userId) {
      return res.status(400).json({
        message: 'Invalid user id',
      });
    }

    const updateUserDto: UpdateUserDto = {
      ...req.body,
    };

    try {
      const result = await this.updateUseProfileUseCase.execute(
        userId,
        updateUserDto,
      );

      return res.status(201).json(result);
    } catch (error: unknown) {
      //todo need to handle specific error
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}
