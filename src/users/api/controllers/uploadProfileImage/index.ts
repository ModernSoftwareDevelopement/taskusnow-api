import { UploadProfileImageController } from './UploadProfileImageController';
import { cloudinaryImageUploader } from '../../../../imageService';
import { updateUserProfileUseCase } from '../../../useCases/uploadUserProfile';

const uploadProfileImageController = new UploadProfileImageController(
  cloudinaryImageUploader,
  updateUserProfileUseCase,
);

export { uploadProfileImageController };
