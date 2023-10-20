import { UploadProfileImageController } from './UploadProfileImageController';
import { cloudinaryImageUploader } from '../../../../imageService';

const uploadProfileImageController = new UploadProfileImageController(
  cloudinaryImageUploader,
);

export { uploadProfileImageController };
