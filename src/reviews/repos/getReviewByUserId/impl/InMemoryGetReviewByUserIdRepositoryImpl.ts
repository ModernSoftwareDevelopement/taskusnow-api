import { GetReviewByUserIdRepositoryInterface } from '../GetReviewByUserIdRepositoryInterface';
import { Review } from '../../../domain/entity/review';
import { reviews } from '../../../database/InMemoryDatabase';

export class InMemoryGetReviewByUserIdRepositoryImpl
  implements GetReviewByUserIdRepositoryInterface {
  async getReviewByUserId(userId: string): Promise<Review | undefined> {
    const result = reviews.find((review) => review.getUserId() === userId);
    if (!result) return undefined;
    return result;
  }
}
