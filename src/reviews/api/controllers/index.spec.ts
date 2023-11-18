import { GetReviewByUserIdController } from './getReviewByUserId/getReviewByUserId';
import { CreateReviewController } from './createReview/createReview';

describe('Create dependencies', () => {
  it('should create review controller instance', () => {
    expect(CreateReviewController).toBeDefined();
  });
});

describe('Create dependencies', () => {
  it('should get review controller instance', () => {
    expect(GetReviewByUserIdController).toBeDefined();
  });
});
