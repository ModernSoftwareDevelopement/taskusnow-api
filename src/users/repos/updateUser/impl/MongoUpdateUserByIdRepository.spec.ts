import { MongoUpdateUserByIdRepository } from './MongoUpdateUserByIdRepository';
import { IUpdateUserRepository } from '../IUpdateUserRepository';
import { UserModel } from '../../../database/mongo/models/User.model';
import { UpdateUserDto } from '../../../api/dtos/UpdateUserDto';

jest.mock('../../../database/mongo/models/User.model', () => ({
  UserModel: {
    findByIdAndUpdate: jest.fn(),
  }
}));

const findByIdAndUpdateMock = UserModel.findByIdAndUpdate as jest.Mock;

describe('MongoUpdateUserByIdRepository', () => {
  let updateUserRepository: IUpdateUserRepository;

  beforeEach(() => {
    updateUserRepository = new MongoUpdateUserByIdRepository();
  });

  it('should update user by ID in the database', async () => {
    const mockUserId = 'someUserId';
    const mockUpdateData: UpdateUserDto = {
      fullName: 'Updated Name',
      imageUrl: 'https://example.com/updated-image.jpg',
      address: '456 New St',
      address_2: 'Apt 789',
      phone: '987-654-3210',
    };

    findByIdAndUpdateMock.mockResolvedValue({ _id: mockUserId, ...mockUpdateData });

    const result = await updateUserRepository.updateUser(mockUserId, mockUpdateData);

    expect(result).toEqual(mockUserId);
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUpdateData);
  });

  it('should throw an error if user is not found', async () => {
    const mockUserId = 'someUserId';
    const mockUpdateData: UpdateUserDto = {
      fullName: 'Updated Name',
      imageUrl: 'https://example.com/updated-image.jpg',
      address: '456 New St',
      address_2: 'Apt 789',
      phone: '987-654-3210',
    };

    findByIdAndUpdateMock.mockResolvedValue(null);

    await expect(updateUserRepository.updateUser(mockUserId, mockUpdateData)).rejects.toThrow('User not found');
    expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUserId, mockUpdateData);
  });
});
