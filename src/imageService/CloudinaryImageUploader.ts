import { ImageUploader } from './ImageUploader';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import config from 'config';

export class CloudinaryImageUploader implements ImageUploader {
  constructor() {
    cloudinary.config({
      cloud_name: config.get('cloudinary.cloudName'),
      api_key: config.get('cloudinary.apiKey'),
      api_secret: config.get('cloudinary.apiSecret'),
    });
  }

  async uploadImage(filename: string, image: Buffer) {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        })
        .end(image);
    });

    return result.secure_url;
  }
}
