import { ICreateUserRepository } from '../../repos/createUser/ICreateUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { CreateUserDTO } from '../../api/dtos/CreateUserDTO';
import { CreateUserResponse } from './CreateUserResponse';

const userRepositoryMock: ICreateUserRepository = {
  createUser: jest.fn(),
};
const createUserMock = userRepositoryMock.createUser as jest.Mock;

const useCase = new CreateUserUseCase(userRepositoryMock);

describe('CreateUserUseCase', () => {
  it('should create user', async () => {
    const mockUserDTO = new CreateUserDTO('liucuxiu@gmail.com');

    createUserMock.mockResolvedValue({
      id: 'random_id',
      email: 'liucuxiu@gmail.com',
    });

    const result: CreateUserResponse = await useCase.execute(mockUserDTO);

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
