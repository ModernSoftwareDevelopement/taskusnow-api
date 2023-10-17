import { CloudinaryImageUploader } from './CloudinaryImageUploader';
import { S3ImageUploader } from './S3ImageUploader';

const cloudinaryImageUploader = new CloudinaryImageUploader();
const s3ImageUploader = new S3ImageUploader('liucuxiu-user-profile-images');

export { cloudinaryImageUploader, s3ImageUploader };
