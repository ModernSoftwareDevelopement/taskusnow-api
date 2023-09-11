import { CreateUserUseCase } from '../../useCases/createUser/CreateUserUseCase';
import { CreateUserController } from './CreateUserController';
import { userRepo } from '../../repos';

const createUserUseCase = new CreateUserUseCase(userRepo);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
