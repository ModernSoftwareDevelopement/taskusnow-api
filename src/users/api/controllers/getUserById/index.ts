import { getUserByIdRepository } from '../../../repos';
import { GetUserByIdUseCase } from '../../../useCases/getUserById/GetUserByIdUseCase';
import { GetUserByIdController } from './GetUserByIdController';

const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

export { getUserByIdController };
