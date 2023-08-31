// src/repositories/ReviewRepositoryImpl.ts
import Review from './Review'
import ReviewRepository from './interface/ReviewRepository'

const reviews: Review[] = []

class ReviewRepositoryImpl implements ReviewRepository {
  async findByUserId(userId: string): Promise<Review[]> {
    return reviews.filter((review) => review.userId === userId)
  }

  async create(review: Review): Promise<void> {
    reviews.push(review)
  }
}

export default ReviewRepositoryImpl
