import { CreateReviewRepositoryInterface } from '../../../repos/createReview/CreateReviewRepositoryInterface';
import { CreateReviewUseCase } from '../../../useCases/createReview/CreateReviewUseCase';
import { CreateReviewController } from './createReview';
import httpMocks from 'node-mocks-http';

const reviewRepoMock: CreateReviewRepositoryInterface = {
  createReview: jest.fn(),
};

jest.mock('../../../useCases/createReview/CreateReviewUseCase', () => {
  const useCase = {
    execute: jest.fn(),
  };
  return {
    CreateReviewUseCase: jest.fn().mockImplementation(() => useCase),
  };
});

const createReviewUseCase = new CreateReviewUseCase(reviewRepoMock);
const createReviewController = new CreateReviewController(createReviewUseCase);
const executeMock = createReviewUseCase.execute as jest.Mock;

describe('CreateReviewController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a review successfully', async () => {
    const mockReviewDto = {
      userId: 'user1234',
      userReview: 'This is a new review',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockReviewDto,
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockResolvedValue({
      userId: 'user1234',
      userReview: 'This is a new review',
    });

    await createReviewController.execute(mockRequest, mockResponse);

    expect(createReviewUseCase.execute).toHaveBeenCalledWith(mockReviewDto);
    expect(mockResponse.statusCode).toBe(201);
    expect(mockResponse._getJSONData()).toEqual({
      userId: 'user1234',
      userReview: 'This is a new review',
    });
  });
});
