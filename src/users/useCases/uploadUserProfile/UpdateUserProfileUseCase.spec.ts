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

describe('Update User Profile Use case', () => {
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
    const mockUpdateUserDto = {
      imageUrl: 'new_url',
      fullName: 'new_full_name',
      email_2: 'new_email_2',
      address: 'new_address',
      address_2: 'new_address_2',
      phone: '0123456789',
    };

    const user = User.create({ email: 'liucuxiu@gmail.com' });

    getUserByIdMock.mockResolvedValue({
      user,
    });

    user.setImageUrl(mockUpdateUserDto.imageUrl);
    user.setFullName(mockUpdateUserDto.fullName);
    user.setEmail_2(mockUpdateUserDto.email_2);
    user.setAddress(mockUpdateUserDto.address);
    user.setAddress_2(mockUpdateUserDto.address_2);
    user.setPhone(mockUpdateUserDto.phone);

    updateUserMock.mockResolvedValue(user);

    const result = await useCase.execute(userId, mockUpdateUserDto);

    expect(getUserByIdRepositoryMock.getUserById).toHaveBeenCalledWith(userId);
    expect(updateUserRepositoryMock.updateUser).toHaveBeenCalledWith(
      userId,
      mockUpdateUserDto,
    );
    expect(result).toEqual(
      expect.objectContaining({
        id: user.getId(),
        email: user.getEmail(),
        imageUrl: mockUpdateUserDto.imageUrl,
        fullName: mockUpdateUserDto.fullName,
        email_2: mockUpdateUserDto.email_2,
        address: mockUpdateUserDto.address,
        address_2: mockUpdateUserDto.address_2,
        phone: mockUpdateUserDto.phone,
      }),
    );
  });

  it('should throw exception when it can not update user', async () => {
    const userId = 'random_id';
    const mockUpdateUserDto = {
      imageUrl: 'new_url',
    };

    const user = User.create({ email: 'liucuxiu@gmail.com' });
    getUserByIdMock.mockResolvedValue({
      user,
    });

    updateUserMock.mockRejectedValue(new Error('Update user error'));

    await expect(useCase.execute(userId, mockUpdateUserDto)).rejects.toThrow(
      'Update user error',
    );
  });
});
