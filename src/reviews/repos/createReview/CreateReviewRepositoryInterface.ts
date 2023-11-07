import { Review } from '../../domain/entity/review';

export interface CreateReviewRepositoryInterface {
  createReview(review: Review): Promise<Review>;
}
