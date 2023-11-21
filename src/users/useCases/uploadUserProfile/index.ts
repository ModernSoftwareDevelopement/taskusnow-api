import { UpdateUserProfileUseCase } from './UpdateUserProfileUseCase';
import { updateUserRepository } from '../../repos';

const updateUserProfileUseCase = new UpdateUserProfileUseCase(
  updateUserRepository,
);

export { updateUserProfileUseCase };
