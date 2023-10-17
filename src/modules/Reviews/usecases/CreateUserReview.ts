// src/usecases/CreateUserReview.ts
import Review from '../entity/Review'
import ReviewRepository from '../interface/ReviewRepository'

class CreateUserReview {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(userId: string, text: string): Promise<void> {
    const review = new Review(Date.now().toString(), userId, text)
    await this.reviewRepository.create(review)
  }
}

export default CreateUserReview
