import { IGetUserByIdRepository } from '../../repos/getUserById/IGetUserByIdRepository';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IGetUserByIdRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.getUserById(id);

    if (!user) throw new Error('User not found');

    return {
      id: user.getId(),
      email: user.getEmail(),
      imageUrl: user.getImageUrl(),
      fullName: user.getFullName(),
    };
  }
}
