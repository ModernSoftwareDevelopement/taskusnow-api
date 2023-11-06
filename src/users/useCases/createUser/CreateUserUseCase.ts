import { ICreateUserRepository } from '../../repos/createUser/ICreateUserRepository';
import { CreateUserDTO } from '../../api/dtos/CreateUserDTO';
import { User } from '../../domain/entity/User';
import { CreateUserResponse } from './CreateUserResponse';

export class CreateUserUseCase {
  constructor(private readonly userRepository: ICreateUserRepository) {}

  async execute(userDTO: CreateUserDTO): Promise<CreateUserResponse> {
    const user = User.create({ email: userDTO.email });

    await this.userRepository.createUser(user);

    return {
      id: user.getId(),
      email: user.getEmail(),
    };
  }
}
