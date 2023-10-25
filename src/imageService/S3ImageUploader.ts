import { ImageUploader } from './ImageUploader';
import { S3 } from 'aws-sdk';

export class S3ImageUploader implements ImageUploader {
  private s3: S3;
  private bucketName: string;

  constructor(bucketName: string) {
    this.bucketName = bucketName;

    this.s3 = new S3({
      region: 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  private generateFileKey(filename: string, timestamp: number): string {
    return `${filename}-${timestamp}.${filename.split('.').pop()}`;
  }

  async uploadImage(filename: string, image: Buffer): Promise<string> {
    const timestamp = Date.now();
    const fileKey = this.generateFileKey(filename, timestamp);

    const result = await this.s3
      .upload({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: image,
      })
      .promise();

    if (result.Location) {
      return result.Location;
    } else {
      throw new Error('Failed to upload the image to S3.');
    }
  }
}
