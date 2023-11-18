import { GetReviewByUserIdRepositoryInterface } from '../../../repos/getReviewByUserId/GetReviewByUserIdRepositoryInterface';
import { GetReviewByUserIdController } from './getReviewByUserId';
import { GetReviewByUserIdUseCase } from '../../../useCases/getReviewByUserId/GetReviewByUserIdUseCase';
import httpMocks from 'node-mocks-http';

const reviewRepoMock: GetReviewByUserIdRepositoryInterface = {
  getReviewByUserId: jest.fn(),
};

jest.mock(
  '../../../useCases/getReviewByUserId/GetReviewByUserIdUseCase',
  () => {
    const useCase = {
      execute: jest.fn(),
    };

    return {
      GetReviewByUserIdUseCase: jest.fn().mockImplementation(() => useCase),
    };
  }
);

const getReviewByUserIdUseCase = new GetReviewByUserIdUseCase(reviewRepoMock);
const getReviewByUserIdController = new GetReviewByUserIdController(
  getReviewByUserIdUseCase
);
const executeMock = getReviewByUserIdUseCase.execute as jest.Mock;

describe('GetReviewByUserIdController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //   it('should get a review successfully', async () => {
  //     const mockId = 'user1234';
  //     const mockRequest = httpMocks.createRequest({
  //       params: {
  //         id: mockId,
  //       },
  //     });
  //     const mockResponse = httpMocks.createResponse();
  //     executeMock.mockResolvedValue({
  //       userId: 'user1234',
  //       userReview: 'This is a review',
  //     });

  //     await getReviewByUserIdController.execute(mockRequest, mockResponse);

  //     expect(mockResponse.statusCode).toBe(200);
  //     expect(mockResponse._getJSONData()).toEqual({
  //       userId: 'user1234',
  //       userReview: 'This is a review',
  //     });

  //     expect(getReviewByUserIdUseCase.execute).toHaveBeenCalledWith(mockId);
  //   });

  it('should return message review when can not find an user', async () => {
    const mockId = 'user1111';
    const mockRequest = httpMocks.createRequest({
      params: {
        id: mockId,
      },
    });
    const mockResponse = httpMocks.createResponse();

    executeMock.mockRejectedValue(new Error('Review not found'));

    await getReviewByUserIdController.execute(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'Review not found',
    });
  });
});
