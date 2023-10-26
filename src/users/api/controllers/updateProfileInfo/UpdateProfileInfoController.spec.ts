import { UpdateUserProfileUseCase } from '../../../useCases/uploadUserProfile/UpdateUserProfileUseCase';
import { IUpdateUserRepository } from '../../../repos/updateUser/IUpdateUserRepository';
import { IGetUserByIdRepository } from '../../../repos/getUserById/IGetUserByIdRepository';
import { UpdateProfileInfoController } from './UpdateProfileInfoController';
import httpMocks from 'node-mocks-http';

const updateUserRepositoryMock: IUpdateUserRepository = {
  updateUser: jest.fn(),
};
const getUserByIdRepositoryMock: IGetUserByIdRepository = {
  getUserById: jest.fn(),
};

jest.mock(
  '../../../useCases/uploadUserProfile/UpdateUserProfileUseCase',
  () => {
    const useCase = {
      execute: jest.fn(),
    };
    return {
      UpdateUserProfileUseCase: jest.fn().mockImplementation(() => useCase),
    };
  },
);

const updateUserProfileUseCase = new UpdateUserProfileUseCase(
  getUserByIdRepositoryMock,
  updateUserRepositoryMock,
);
const updateUserProfileController = new UpdateProfileInfoController(
  updateUserProfileUseCase,
);

const executeMock = updateUserProfileUseCase.execute as jest.Mock;

describe('UpdateProfileInfoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should response Invalid user id when there is no user id', async () => {
    const mockUserUpdateDTO = {
      fullName: 'Minh Tu Phan',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockUserUpdateDTO,
    });
    const mockResponse = httpMocks.createResponse();

    await updateUserProfileController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).not.toHaveBeenCalled();
    expect(mockResponse.statusCode).toBe(400);
  });

  it('should response Invalid user id when there is no user found', async () => {
    const mockUserUpdateDTO = {
      fullName: 'Minh Tu Phan',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockUserUpdateDTO,
      auth: {
        payload: {
          my_api_user_id: '123',
        },
      },
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockRejectedValue(new Error('User not found'));

    await updateUserProfileController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).toHaveBeenCalledWith(
      '123',
      mockUserUpdateDTO,
    );
    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'User not found',
    });
  });

  it('should response Unexpected error when there is an error ', async () => {
    const mockUserUpdateDTO = {
      fullName: 'Minh Tu Phan',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockUserUpdateDTO,
      auth: {
        payload: {
          my_api_user_id: '123',
        },
      },
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockRejectedValue(new Error('Unexpected error'));

    await updateUserProfileController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).toHaveBeenCalledWith(
      '123',
      mockUserUpdateDTO,
    );
    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'Unexpected error',
    });
  });

  it('should update a user successfully', async () => {
    const mockUserUpdateDTO = {
      fullName: 'Minh Tu Phan',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockUserUpdateDTO,
      auth: {
        payload: {
          my_api_user_id: '123',
        },
      },
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockResolvedValue({
      id: '123',
      fullName: 'Minh Tu Phan',
    });

    await updateUserProfileController.execute(mockRequest, mockResponse);

    expect(updateUserProfileUseCase.execute).toHaveBeenCalledWith(
      '123',
      mockUserUpdateDTO,
    );
    expect(mockResponse.statusCode).toBe(201);
    expect(mockResponse._getJSONData()).toEqual({
      id: '123',
      fullName: 'Minh Tu Phan',
    });
  });
});
