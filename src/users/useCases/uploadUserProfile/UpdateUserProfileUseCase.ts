import { IGetUserByIdRepository } from '../../repos/getUserById/IGetUserByIdRepository';
import { UpdateUserDto } from '../../api/dtos/UpdateUserDto';
import { IUpdateUserRepository } from '../../repos/updateUser/IUpdateUserRepository';
import { UpdateUserResponse } from './UpdateUserResponse';

export class UpdateUserProfileUseCase {
  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}

  async execute(userId: string, updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {
    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.updateUserRepository.updateUser(
      userId,
      updateUserDto,
    );

    if (!updatedUser) {
      throw new Error('User not updated');
    }
    return {
      userId: updatedUser,
    };
  }
}
