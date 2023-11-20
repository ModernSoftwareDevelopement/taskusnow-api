import { GetReviewByUserIdUseCase } from '../../../useCases/getReviewByUserId/GetReviewByUserIdUseCase';
import { Request, Response } from 'express';

export class GetReviewByUserIdController {
  constructor(
    private readonly getReviewByUserIdUseCase: GetReviewByUserIdUseCase
  ) {}

  async execute(request: Request, response: Response): Promise<void> {
    const { userId } = request.params;

    try {
      const review = await this.getReviewByUserIdUseCase.execute(userId);
      response.status(200).json(review);
    } catch (error) {
      response.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}
