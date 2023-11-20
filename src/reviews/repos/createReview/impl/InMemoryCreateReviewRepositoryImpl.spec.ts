import { Review } from '../../../domain/entity/review';
import { InMemoryCreateReviewRepositoryImpl } from './InMemoryCreateReviewRepositoryImpl';

describe('InMemoryCreateReviewRepository', () => {
  it('should create a review', async () => {
    const repo = new InMemoryCreateReviewRepositoryImpl();
    const newReview = Review.create('user1234', 'This is a review');

    // ---

    const result = await repo.createReview(newReview);
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: 'user1234',
        userReview: 'This is a review',
      })
    );
  });
});
