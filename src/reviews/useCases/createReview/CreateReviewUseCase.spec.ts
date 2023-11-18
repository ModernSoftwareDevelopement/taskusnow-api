import { CreateReviewRepositoryInterface } from './../../repos/createReview/CreateReviewRepositoryInterface';
import { CreateReviewDTO } from './../../api/dtos/CreateReviewDTO';
import { CreateReviewUseCase } from './CreateReviewUseCase';

const mockCreateReviewRepo: CreateReviewRepositoryInterface = {
  createReview: jest.fn(),
};

const createReviewMock = mockCreateReviewRepo.createReview as jest.Mock;
const createReivewUseCase = new CreateReviewUseCase(mockCreateReviewRepo);

describe('CreateReviewUseCase Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a task with valid task data', async () => {
    const validCreateReivewDTO: CreateReviewDTO = {
      userId: 'user2234',
      userReview: 'Review Description',
    };
    createReviewMock.mockResolvedValue('generatedID');

    const result = await createReivewUseCase.execute(validCreateReivewDTO);

    expect(result.id).toEqual('generatedID');
    expect(mockCreateReviewRepo.createReview).toHaveBeenCalledTimes(1);
  });
});
