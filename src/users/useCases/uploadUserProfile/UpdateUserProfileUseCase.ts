import { UpdateUserDto } from '../../api/dtos/UpdateUserDto';
import { IUpdateUserRepository } from '../../repos/updateUser/IUpdateUserRepository';
import { UpdateUserResponse } from './UpdateUserResponse';

export class UpdateUserProfileUseCase {
  constructor(
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {
  }

  async execute(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    const updatedUser = await this.updateUserRepository.updateUser(
      userId,
      updateUserDto,
    );

    return {
      userId: updatedUser,
    };
  }
}
