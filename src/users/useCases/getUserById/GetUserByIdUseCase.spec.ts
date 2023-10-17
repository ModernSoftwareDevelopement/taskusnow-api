import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import { IGetUserByIdRepository } from '../../repos/getUserById/IGetUserByIdRepository';
import { User } from '../../domain/entity/User';

const userRepositoryMock: IGetUserByIdRepository = {
  getUserById: jest.fn(),
};
const getUserByIdMock = userRepositoryMock.getUserById as jest.Mock;

const useCase = new GetUserByIdUseCase(userRepositoryMock);

describe('GetUserByIdUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw exception when there is unexpected exception in database', async () => {
    getUserByIdMock.mockRejectedValue(new Error('Unexpected error'));

    const result = useCase.execute('invalid_id');

    await expect(result).rejects.toThrow(new Error('Unexpected error'));
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith('invalid_id');
  });

  it('should throw user not found when there is no user in database', async () => {
    getUserByIdMock.mockResolvedValue(null);

    const result = useCase.execute('invalid_id');

    await expect(result).rejects.toThrow(new Error('User not found'));
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith('invalid_id');
  });

  it('should return user when id is valid', async () => {
    const mockUser = new User('liu@gmail.com');

    getUserByIdMock.mockResolvedValue(mockUser);

    const result = await useCase.execute('random_id');
    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'liu@gmail.com',
      }),
    );
    expect(userRepositoryMock.getUserById).toHaveBeenCalledWith('random_id');
  });
});
