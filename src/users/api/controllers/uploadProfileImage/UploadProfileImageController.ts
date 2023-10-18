import { Request, Response } from 'express';
import { ImageUploader } from '../../../../imageService/ImageUploader';
import { UpdateUserProfileUseCase } from '../../../useCases/uploadUserProfile/UpdateUserProfileUseCase';

export class UploadProfileImageController {
  constructor(
    private readonly imageUploader: ImageUploader,
    private readonly updateUseProfileUseCase: UpdateUserProfileUseCase,
  ) {}

  async execute(req: Request, res: Response): Promise<Response> {
    if (!req.file) {
      return res.status(400).json({
        message: 'Please upload a file',
      });
    }

    const userId = req.params.userId || '';

    const { originalname, buffer } = req.file;

    console.log('payload', req.auth);

    const imageUrl = await this.imageUploader.uploadImage(originalname, buffer);

    const result = await this.updateUseProfileUseCase.execute(userId, {
      imageUrl,
    });

    return res.status(201).json({
      message: result,
    });
  }
}
