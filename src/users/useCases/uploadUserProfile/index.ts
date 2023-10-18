import { UpdateUserProfileUseCase } from './UpdateUserProfileUseCase';
import { getUserByIdRepository, updateUserRepository } from '../../repos';

const updateUserProfileUseCase = new UpdateUserProfileUseCase(
  getUserByIdRepository,
  updateUserRepository,
);

export { updateUserProfileUseCase };
