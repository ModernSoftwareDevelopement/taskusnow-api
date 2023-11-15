import { MongoCreateUserRepository } from './MongoCreateUserRepository';
import { User } from '../../../domain/entity/User';
import { UserModel } from '../../../database/mongo/models/User.model';

jest.mock('../../../database/mongo/models/User.model');

describe('MongoCreateUserRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user in the database', async () => {
    // Arrange
    const userRepository = new MongoCreateUserRepository();
    const mockUser = User.create({
      email: '',
    }, 'random_id');

    await userRepository.createUser(mockUser);

    expect(UserModel.create).toHaveBeenCalledTimes(1);
    expect(UserModel.create).toHaveBeenCalledWith({
      _id: mockUser.getId(),
      email: mockUser.getEmail(),
      fullName: mockUser.getFullName(),
      imageUrl: mockUser.getImageUrl(),
      address: mockUser.getAddress(),
      address_2: mockUser.getAddress_2(),
      phone: mockUser.getPhone(),
    });
  });
});
