import { MongoGetUserByIdRepository } from './MongoGetUserByIdRepository';
import { IGetUserByIdRepository } from '../IGetUserByIdRepository';
import { UserModel } from '../../../database/mongo/models/User.model';
import { User } from '../../../domain/entity/User';

jest.mock('../../../database/mongo/models/User.model', () => ({
  UserModel: {
    findById: jest.fn(),
  }
}));

const findByIdMock = UserModel.findById as jest.Mock;

describe('MongoGetUserByIdRepository', () => {
  let getUserByIdRepository: IGetUserByIdRepository;

  beforeEach(() => {
    getUserByIdRepository = new MongoGetUserByIdRepository();
  });

  it('should get user by ID from the database', async () => {
    // Arrange
    const mockUserId = 'someUserId';
    const mockUserDocument = {
      _id: mockUserId,
      email: 'test@example.com',
      fullName: 'John Doe',
      imageUrl: 'https://example.com/image.jpg',
      address: '123 Main St',
      address_2: 'Apt 456',
      phone: '123-456-7890',
    };
    const expectedUser = User.create(
      {
        email: mockUserDocument.email,
        fullName: mockUserDocument.fullName,
        imageUrl: mockUserDocument.imageUrl,
        address: mockUserDocument.address,
        address_2: mockUserDocument.address_2,
        phone: mockUserDocument.phone,
      },
      mockUserId
    );

    findByIdMock.mockResolvedValue(mockUserDocument);

    const result = await getUserByIdRepository.getUserById(mockUserId);

    expect(result).toEqual(expectedUser);
    expect(UserModel.findById).toHaveBeenCalledWith(mockUserId);
  });

  it('should return undefined if user with ID is not found', async () => {
    const nonExistentUserId = 'nonExistentUserId';

    findByIdMock.mockResolvedValue(null);

    const result = await getUserByIdRepository.getUserById(nonExistentUserId);

    expect(result).toBeUndefined();
    expect(UserModel.findById).toHaveBeenCalledWith(nonExistentUserId);
  });
});
