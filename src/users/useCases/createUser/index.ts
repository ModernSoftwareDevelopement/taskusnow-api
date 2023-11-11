import { CreateUserUseCase } from './CreateUserUseCase';
import { createUserRepository } from '../../repos';

const createUserUseCase = new CreateUserUseCase(createUserRepository);

export { createUserUseCase };
