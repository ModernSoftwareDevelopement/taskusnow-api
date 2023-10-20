import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { CreateUserController } from './CreateUserController';
import { createUserRepository } from '../../../repos';

const createUserUseCase = new CreateUserUseCase(createUserRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
