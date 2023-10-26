import { InMemoryCreateReviewRepositoryInterface } from '../InMemoryCreateReviewRepositoryInterface'
import { Review } from '../../../domain/entity/review'
import { reviews } from '../../../database/InMemoryDatabase'

export class InMemoryCreateReviewRepository
  implements InMemoryCreateReviewRepositoryInterface {
  async createReview(review: Review): Promise<Review> {
    reviews.push(review)
    return review
  }
}
