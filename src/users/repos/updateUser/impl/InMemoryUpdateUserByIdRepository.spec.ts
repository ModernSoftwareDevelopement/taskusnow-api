import { InMemoryUpdateUserByIdRepository } from './InMemoryUpdateUserByIdRepository';
import { IUpdateUserRepository } from '../IUpdateUserRepository';
import { users } from '../../../database/inMemoryDatabase';
import { User } from '../../../domain/entity/User';

describe('InMemoryUpdateUserByIdRepository', () => {
  let repository: IUpdateUserRepository;

  beforeEach(() => {
    repository = new InMemoryUpdateUserByIdRepository();
  });

  it('should update a user in the in-memory database', async () => {
    users.push(
      User.create(
        {
          email: 'liu',
        },
        '123',
      ),
    );
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
    expect(updatedUser).toEqual({
      id: '123',
      email: 'liu',
      imageUrl: 'newImageUrl',
      fullName: 'New Full Name',
      email_2: 'newEmail@example.com',
      address: 'New Address',
      address_2: 'New Address 2',
      phone: '1234567890',
    });
  });

  it('should throw an error when updating a non-existent user', async () => {
    const userId = 'nonexistent';
    const updateData = {
      // Update data
    };

    const result = repository.updateUser(userId, updateData);

    await expect(result).rejects.toThrow('User not found');
  });
});
