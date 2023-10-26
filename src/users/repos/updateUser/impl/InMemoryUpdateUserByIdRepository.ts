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
    user.setEmail_2(data.email_2 ?? user.getEmail_2());
    user.setAddress(data.address ?? user.getAddress());
    user.setAddress_2(data.address_2 ?? user.getAddress_2());
    user.setPhone(data.phone ?? user.getPhone());

    return user;
  }
}
