import { GetReviewByUserIdResponse } from './GetReviewByUserIdResponse';
import { GetReviewByUserIdRepositoryInterface } from '../../repos/getReviewByUserId/GetReviewByUserIdRepositoryInterface';

export class GetReviewByUserIdUseCase {
  constructor(
    private readonly reviewRepository: GetReviewByUserIdRepositoryInterface
  ) {}

  async execute(userId: string): Promise<GetReviewByUserIdResponse> {
    const retrieveReview = await this.reviewRepository.getReviewByUserId(
      userId
    );

    if (retrieveReview == undefined) throw new Error('Review not found');
    return {
      id: retrieveReview.getId(),
      userId: retrieveReview?.getUserId(),
      userReview: retrieveReview?.getUserReview(),
    };
  }
}
