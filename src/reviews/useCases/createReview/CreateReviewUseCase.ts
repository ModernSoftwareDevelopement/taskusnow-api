import { CreateReviewDTO } from '../../api/dtos/CreateReviewDTO';
import { Review } from '../../domain/entity/review';
import { CreateReviewRepositoryInterface } from '../../repos/createReview/CreateReviewRepositoryInterface';
import { CreateReviewResponse } from './CreateReviewResponse';

export class CreateReviewUseCase {
  constructor(
    private readonly reviewRepository: CreateReviewRepositoryInterface
  ) {}

  async execute(reviewDTO: CreateReviewDTO): Promise<CreateReviewResponse> {
    const review = new Review(reviewDTO.getUserId(), reviewDTO.getUserReview());
    await this.reviewRepository.createReview(review);
    return {
      id: review.getId(),
      userId: review.getUserId(),
      userReview: review.getUserReview(),
    };
  }
}
