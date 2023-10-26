import { CreateReviewUseCase } from '../../../useCases/createReview/CreateReviewUseCase'
import { Request, Response } from 'express'
import { CreateReviewDTO } from '../../dtos/CreateReviewDTO'

export class CreateReviewController {
  constructor(private readonly createReviewUseCase: CreateReviewUseCase) {}

  async execute(request: Request, response: Response): Promise<void> {
    const { userId } = request.body
    const { userReview } = request.body
    const reviewDTO = new CreateReviewDTO(userId, userReview)

    try {
      const reviewResponse = await this.createReviewUseCase.execute(reviewDTO)
      response.status(201).json(reviewResponse)
    } catch (error) {
      response.status(500).json({
        message: (error as Error).message,
      })
    }
  }
}
