import { Request, Response } from 'express';
import { ImageUploader } from '../../../../imageService/ImageUploader';

export class UploadProfileImageController {
  constructor(private readonly imageUploader: ImageUploader) {}

  async execute(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({
        message: 'Please upload a file',
      });
    }

    const { originalname, buffer } = req.file;

    const result = await this.imageUploader.uploadImage(originalname, buffer);

    //uploadProfileImageUseCase.execute(originalname);

    return res.status(201).json({
      message: result,
    });
  }
}
