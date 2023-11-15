import { IUpdateUserRepository } from '../../repos/updateUser/IUpdateUserRepository';
import { UpdateUserProfileUseCase } from './UpdateUserProfileUseCase';
import { User } from '../../domain/entity/User';

const updateUserRepositoryMock: IUpdateUserRepository = {
  updateUser: jest.fn(),
};

const updateUserMock = updateUserRepositoryMock.updateUser as jest.Mock;

const useCase = new UpdateUserProfileUseCase(
  updateUserRepositoryMock,
);

describe('Update User Profile Use case', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw exception when it cannot find an user', async () => {
    const userId = 'random_id';

    updateUserMock.mockRejectedValue(new Error('User not found'));

    await expect(useCase.execute(userId, {})).rejects.toThrow('User not found');
  });

  it('should update user profile', async () => {
    const userId = 'random_id';
    const mockUpdateUserDto = {
      imageUrl: 'new_url',
      fullName: 'new_full_name',
      email_2: 'new_email_2',
      address: 'new_address',
      address_2: 'new_address_2',
      phone: '0123456789',
    };

    const user = User.create({ email: 'liucuxiu@gmail.com' });
    updateUserMock.mockResolvedValue(user.getId());

    const result = await useCase.execute(userId, mockUpdateUserDto);

    expect(updateUserRepositoryMock.updateUser).toHaveBeenCalledWith(
      userId,
      mockUpdateUserDto,
    );
    expect(result).toEqual({
      userId: user.getId(),
    });
  });

  it('should throw exception when it can not update user', async () => {
    const userId = 'random_id';
    const mockUpdateUserDto = {
      imageUrl: 'new_url',
    };

    updateUserMock.mockRejectedValue(new Error('Update user error'));

    await expect(useCase.execute(userId, mockUpdateUserDto)).rejects.toThrow(
      'Update user error',
    );
  });
});
