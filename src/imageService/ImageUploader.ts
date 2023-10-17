export interface ImageUploader {
  uploadImage(filename: string, image: Buffer): Promise<string>;
}
