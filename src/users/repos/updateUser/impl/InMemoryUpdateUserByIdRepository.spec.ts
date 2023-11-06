import { InMemoryUpdateUserByIdRepository } from './InMemoryUpdateUserByIdRepository';
import { IUpdateUserRepository } from '../IUpdateUserRepository';
import { users } from '../../../database/inMemoryDatabase';
import { User } from '../../../domain/entity/User';

jest.mock('../../../database/inMemoryDatabase', () => ({
  users,
}));

describe('InMemoryUpdateUserByIdRepository', () => {
  let repository: IUpdateUserRepository;

  beforeEach(() => {
    repository = new InMemoryUpdateUserByIdRepository();
  });

  it('should update a user in the in-memory database', async () => {
    const userId = '123'; // Provide a valid user ID
    const updateData = {
      imageUrl: 'newImageUrl',
      fullName: 'New Full Name',
      email_2: 'newEmail@example.com',
      address: 'New Address',
      address_2: 'New Address 2',
      phone: '1234567890',
    };

    const updatedUser = await repository.updateUser(userId, updateData);

    // Perform assertions here based on your data
    expect(updatedUser).toEqual(expect.any(Object));
  });

  it('should throw an error when updating a non-existent user', async () => {
    const userId = 'nonexistent';
    const updateData = {
      // Update data
    };

    const result = repository.updateUser(userId, updateData);

    await expect(result).rejects.toThrow('Update user error');
  });
});
