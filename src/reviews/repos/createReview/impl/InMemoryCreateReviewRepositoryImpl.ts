import { CreateReviewRepositoryInterface } from '../CreateReviewRepositoryInterface';
import { Review } from '../../../domain/entity/review';
import { reviews } from '../../../database/InMemoryDatabase';

export class InMemoryCreateReviewRepositoryImpl
  implements CreateReviewRepositoryInterface {
  async createReview(review: Review): Promise<Review> {
    reviews.push(review);
    return review;
  }
}
