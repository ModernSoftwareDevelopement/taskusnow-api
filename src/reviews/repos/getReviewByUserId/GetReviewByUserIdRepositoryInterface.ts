import { Review } from '../../domain/entity/review';

export interface GetReviewByUserIdRepositoryInterface {
  getReviewByUserId(userId: string): Promise<Review | undefined>;
}
