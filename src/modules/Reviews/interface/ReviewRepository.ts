// src/interfaces/ReviewRepository.ts
import Review from '../Review'

interface ReviewRepository {
  findByUserId(userId: string): Promise<Review[]>
  create(review: Review): Promise<void>
}

export default ReviewRepository
