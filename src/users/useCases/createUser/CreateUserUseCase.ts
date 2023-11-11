import { ICreateUserRepository } from '../../repos/createUser/ICreateUserRepository';
import { CreateUserDto } from '../../api/dtos/CreateUserDto';
import { User } from '../../domain/entity/User';
import { CreateUserResponse } from './CreateUserResponse';

export class CreateUserUseCase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  async execute(userDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = User.create({ email: userDto.email });

    await this.userRepository.createUser(user);

    return {
      id: user.getId(),
      email: user.getEmail(),
    };
  }
}
