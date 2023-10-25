import { CreateReviewDTO } from './../repos/dtos/CreateReviewDTO'
// src/usecases/CreateUserReview.ts

import ReviewRepositoryInterface from '../interface/ReviewRepositoryInterface'
class CreateUserReview {
  constructor(private reviewRepository: ReviewRepositoryInterface) {}

  async execute(userid: string, userreview: string): Promise<void> {
    const review = new CreateReviewDTO(
      Date.now().toString(),
      userId,
      userreview,
    )
    await this.reviewRepository.create(review)
  }
}

export default CreateUserReview
