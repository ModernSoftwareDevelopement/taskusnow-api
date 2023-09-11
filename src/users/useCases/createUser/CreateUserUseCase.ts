import { IUserRepository } from '../../repos/IUserRepository';
import { CreateUserDTO } from './CreateUserDTO';
import { User } from '../../domain/entity/User';
import { CreateUserResponse } from './CreateUserResponse';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userDTO: CreateUserDTO): Promise<CreateUserResponse> {
    const user = new User(userDTO.email);

    await this.userRepository.createUser(user);

    return {
      id: user.getId(),
      email: user.getEmail(),
    };
  }
}
