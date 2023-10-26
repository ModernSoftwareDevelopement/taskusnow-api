import { InMemoryCreateReviewRepository } from './impl/InMemoryCreateReviewRepository'
import { Review } from '../../domain/entity/review'

export interface InMemoryCreateReviewRepositoryInterface {
  createReview(review: Review): Promise<Review>
}
