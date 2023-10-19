import { UpdateProfileInfoController } from './UpdateProfileInfoController';
import { updateUserProfileUseCase } from '../../../useCases/uploadUserProfile';

const updateProfileInfoController = new UpdateProfileInfoController(
  updateUserProfileUseCase,
);

export { updateProfileInfoController };
