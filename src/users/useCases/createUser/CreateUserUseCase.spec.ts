import { ICreateUserRepository } from '../../repos/createUser/ICreateUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserResponse } from './CreateUserResponse';

const userRepositoryMock: ICreateUserRepository = {
  createUser: jest.fn(),
};
const createUserMock = userRepositoryMock.createUser as jest.Mock;

const useCase = new CreateUserUseCase(userRepositoryMock);

describe('CreateUserUseCase', () => {
  it('should create user', async () => {
    const mockUserDto = {
      email: 'liucuxiu@gmail.com',
    };

    createUserMock.mockResolvedValue({
      id: 'random_id',
      email: 'liucuxiu@gmail.com',
    });

    const result: CreateUserResponse = await useCase.execute(mockUserDto);

    expect(userRepositoryMock.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(String),
        email: 'liucuxiu@gmail.com',
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'liucuxiu@gmail.com',
      }),
    );
  });
});
