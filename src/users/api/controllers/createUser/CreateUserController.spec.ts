import { ICreateUserRepository } from '../../../repos/createUser/ICreateUserRepository';
import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { CreateUserController } from './CreateUserController';
import httpMocks from 'node-mocks-http';

const userRepositoryMock: ICreateUserRepository = {
  createUser: jest.fn(),
};

jest.mock('../../../useCases/createUser/CreateUserUseCase', () => {
  const useCase = {
    execute: jest.fn(),
  };
  return {
    CreateUserUseCase: jest.fn().mockImplementation(() => useCase),
  };
});

const createUserUseCase = new CreateUserUseCase(userRepositoryMock);
const createUserController = new CreateUserController(createUserUseCase);

const executeMock = createUserUseCase.execute as jest.Mock;

describe('CreateUserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    const mockUserDTO = {
      email: 'liucuxiu@gmail.com',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockUserDTO,
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockResolvedValue({
      id: '123',
      email: 'liucuxiu@gmail.com',
    });

    await createUserController.execute(mockRequest, mockResponse);

    expect(createUserUseCase.execute).toHaveBeenCalledWith(mockUserDTO);
    expect(mockResponse.statusCode).toBe(201);
    expect(mockResponse._getJSONData()).toEqual({
      id: '123',
      email: 'liucuxiu@gmail.com',
    });
  });

  it('should response Unexpected error when there is an error ', async () => {
    const mockUserDTO = {
      email: 'liucuxiu@gmail.com',
    };
    const mockRequest = httpMocks.createRequest({
      body: mockUserDTO,
    });
    const mockResponse = httpMocks.createResponse();
    executeMock.mockRejectedValue(new Error('Unexpected error'));

    await createUserController.execute(mockRequest, mockResponse);

    expect(createUserUseCase.execute).toHaveBeenCalledWith(mockUserDTO);
    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse._getJSONData()).toEqual({
      message: 'Unexpected error',
    });
  });
});
