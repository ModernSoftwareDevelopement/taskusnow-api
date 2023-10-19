import { ImageUploader } from './ImageUploader';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

export class CloudinaryImageUploader implements ImageUploader {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
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
