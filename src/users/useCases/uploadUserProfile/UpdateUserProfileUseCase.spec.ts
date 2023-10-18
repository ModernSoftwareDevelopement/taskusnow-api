import { IUpdateUserRepository } from '../../repos/updateUser/IUpdateUserRepository';
import { IGetUserByIdRepository } from '../../repos/getUserById/IGetUserByIdRepository';
import { UpdateUserProfileUseCase } from './UpdateUserProfileUseCase';
import { User } from '../../domain/entity/User';

const updateUserRepositoryMock: IUpdateUserRepository = {
  updateUser: jest.fn(),
};
const getUserByIdRepositoryMock: IGetUserByIdRepository = {
  getUserById: jest.fn(),
};
const updateUserMock = updateUserRepositoryMock.updateUser as jest.Mock;
const getUserByIdMock = getUserByIdRepositoryMock.getUserById as jest.Mock;

const useCase = new UpdateUserProfileUseCase(
  getUserByIdRepositoryMock,
  updateUserRepositoryMock,
);

describe('Update User Profile Usecase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw exception when it cannot find an user', async () => {
    const userId = 'random_id';

    getUserByIdMock.mockResolvedValue(null);

    await expect(useCase.execute(userId, {})).rejects.toThrow('User not found');
  });

  it('should update user profile', async () => {
    const userId = 'random_id';
    const mockUpdateUserDTO = {
      imageUrl: 'new_url',
    };

    const user = new User('liucuxiu@gmail.com');

    getUserByIdMock.mockResolvedValue({
      user,
    });

    user.setImageUrl(mockUpdateUserDTO.imageUrl);
    updateUserMock.mockResolvedValue(user);

    const result = await useCase.execute(userId, mockUpdateUserDTO);

    expect(getUserByIdRepositoryMock.getUserById).toHaveBeenCalledWith(userId);
    expect(updateUserRepositoryMock.updateUser).toHaveBeenCalledWith(
      userId,
      mockUpdateUserDTO,
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: user.getId(),
        email: user.getEmail(),
        imageUrl: mockUpdateUserDTO.imageUrl,
      }),
    );
  });

  it('should throw exception when it can not update user', async () => {
    const userId = 'random_id';
    const mockUpdateUserDTO = {
      imageUrl: 'new_url',
    };

    const user = new User('liucuxiu@gmail.com');
    getUserByIdMock.mockResolvedValue({
      user,
    });

    updateUserMock.mockRejectedValue(new Error('Update user error'));

    await expect(useCase.execute(userId, mockUpdateUserDTO)).rejects.toThrow(
      'Update user error',
    );
  });
});
