// src/usecases/GetUserReviews.ts
import Review from '../Review'
import ReviewRepository from '../interface/ReviewRepository'

class GetUserReviews {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(userId: string): Promise<Review[]> {
    return this.reviewRepository.findByUserId(userId)
  }
}

export default GetUserReviews
