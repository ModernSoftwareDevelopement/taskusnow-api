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
      email_2: user.getEmail_2(),
      address: user.getAddress(),
      address_2: user.getAddress_2(),
      phone: user.getPhone(),
    };
  }
}
