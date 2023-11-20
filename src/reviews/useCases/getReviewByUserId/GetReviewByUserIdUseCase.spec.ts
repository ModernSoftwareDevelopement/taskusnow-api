import { Review } from '../../domain/entity/review';
import { GetReviewByUserIdRepositoryInterface } from './../../repos/getReviewByUserId/GetReviewByUserIdRepositoryInterface';
import { GetReviewByUserIdUseCase } from './GetReviewByUserIdUseCase';

const reviewRepoMock: GetReviewByUserIdRepositoryInterface = {
  getReviewByUserId: jest.fn(),
};

const getReviewMock = reviewRepoMock.getReviewByUserId as jest.Mock;

const useCase = new GetReviewByUserIdUseCase(reviewRepoMock);

describe('GetReviewById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw exception when there is unexpected exception in database test1', async () => {
    getReviewMock.mockRejectedValue(new Error('Unexpected error'));

    const result = useCase.execute('invalid_id');

    await expect(result).rejects.toThrow(new Error('Unexpected error'));
    expect(reviewRepoMock.getReviewByUserId).toHaveBeenCalledWith('invalid_id');
  });

  it('should throw exception when there is unexpected exception in database test1', async () => {
    getReviewMock.mockResolvedValue(null);

    const result = useCase.execute('invalid_id');

    await expect(result).rejects.toThrow(new Error('Review not found'));
    expect(reviewRepoMock.getReviewByUserId).toHaveBeenCalledWith('invalid_id');
  });

  it('should return review when id is valid', async () => {
    const mockReview = Review.create('user1234', 'This is a review');

    getReviewMock.mockResolvedValue(mockReview);

    const result = await useCase.execute('random_id');
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: 'user1234',
        userReview: 'This is a review',
      })
    );

    expect(reviewRepoMock.getReviewByUserId).toHaveBeenCalledWith('random_id');
  });
});
