import { IUpdateUserRepository } from '../IUpdateUserRepository';
import { UpdateUserDTO } from '../../../api/dtos/UpdateUserDTO';
import { User } from '../../../domain/entity/User';
import { users } from '../../../database/inMemoryDatabase';

export class InMemoryUpdateUserByIdRepository implements IUpdateUserRepository {
  async updateUser(userId: string, data: UpdateUserDTO): Promise<User> {
    const user = users.find((user) => user.getId() === userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.setImageUrl(data.imageUrl ?? user.getImageUrl());
    user.setFullName(data.fullName ?? user.getFullName());

    return user;
  }
}
