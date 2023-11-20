import { CreateReviewRepositoryInterface } from '../../repos/createReview/CreateReviewRepositoryInterface';
import { CreateReviewUseCase } from './CreateReviewUseCase';
import { CreateReviewResponse } from './CreateReviewResponse';

const reviewRepoMock: CreateReviewRepositoryInterface = {
  createReview: jest.fn(),
};

const createReviewMock = reviewRepoMock.createReview as jest.Mock;
const useCase = new CreateReviewUseCase(reviewRepoMock);

describe('CreateReviewUseCase', () => {
  it('should create review', async () => {
    const mockReviewDto = {
      userId: 'user1234',
      userReview: 'This is a new review',
    };

    createReviewMock.mockResolvedValue({
      userId: 'user1234',
      userReview: 'This is a new review',
    });

    const result: CreateReviewResponse = await useCase.execute(mockReviewDto);

    expect(reviewRepoMock.createReview).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        userId: 'user1234',
        userReview: 'This is a new review',
      })
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: 'user1234',
        userReview: 'This is a new review',
      })
    );
  });
});
