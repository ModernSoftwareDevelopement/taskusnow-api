import { CreateUserController } from './CreateUserController';
import { createUserUseCase } from '../../../useCases/createUser';

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
