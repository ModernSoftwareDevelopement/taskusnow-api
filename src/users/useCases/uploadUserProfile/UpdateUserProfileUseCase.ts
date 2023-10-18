import { IGetUserByIdRepository } from '../../repos/getUserById/IGetUserByIdRepository';
import { UpdateUserDTO } from '../../api/dtos/UpdateUserDTO';
import { IUpdateUserRepository } from '../../repos/updateUser/IUpdateUserRepository';
import { UpdateUserResponse } from './UpdateUserResponse';

export class UpdateUserProfileUseCase {
  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
  ) {}

  async execute(userId: string, updateUserDTO: UpdateUserDTO) {
    const user = await this.getUserByIdRepository.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.updateUserRepository.updateUser(
      userId,
      updateUserDTO,
    );

    const userResponse: UpdateUserResponse = {
      id: updatedUser.getId(),
      email: updatedUser.getEmail(),
      imageUrl: updatedUser.getImageUrl(),
      fullName: updatedUser.getFullName(),
    };

    return userResponse;
  }
}
