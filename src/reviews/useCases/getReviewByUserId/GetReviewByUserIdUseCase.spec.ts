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
});
