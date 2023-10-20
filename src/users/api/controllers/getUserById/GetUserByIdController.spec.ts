import { IGetUserByIdRepository } from '../../../repos/getUserById/IGetUserByIdRepository';
import { GetUserByIdUseCase } from '../../../useCases/getUserById/GetUserByIdUseCase';
import { GetUserByIdController } from './GetUserByIdController';
import httpMocks from 'node-mocks-http';

const userRepositoryMock: IGetUserByIdRepository = {
  getUserById: jest.fn(),
};

jest.mock('.../../../useCases/getUserById/GetUserByIdUseCase', () => {
  const useCase = {
    execute: jest.fn(),
  };

  return {
    GetUserByIdUseCase: jest.fn().mockImplementation(() => useCase),
  };
});

const getUserByIdUseCase = new GetUserByIdUseCase(userRepositoryMock);
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

const executeMock = getUserByIdUseCase.execute as jest.Mock;

describe('GetUserByIdController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get a user successfully', async () => {
    const mockId = '123';
    const mockRequest = httpMocks.createRequest({
      params: {
        id: mockId,
      },
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockResolvedValue({
      id: '123',
      email: 'liu@gmail.com',
    });

    await getUserByIdController.execute(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toBe(200);
    expect(mockResponse._getJSONData()).toEqual({
      id: '123',
      email: 'liu@gmail.com',
    });
    expect(getUserByIdUseCase.execute).toHaveBeenCalledWith(mockId);
  });

  it('should return message user not found when can not find an user', async () => {
    const mockId = '123';
    const mockRequest = httpMocks.createRequest({
      params: {
        id: mockId,
      },
    });
    const mockResponse = httpMocks.createResponse();

    executeMock.mockRejectedValue(new Error('User not found'));

    await getUserByIdController.execute(mockRequest, mockResponse);

    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'User not found',
    });
  });
});
