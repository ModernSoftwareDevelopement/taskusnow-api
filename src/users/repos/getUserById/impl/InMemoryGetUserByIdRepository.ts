import { users } from '../../../database/inMemoryDatabase';
import { IGetUserByIdRepository } from '../IGetUserByIdRepository';
import { User } from '../../../domain/entity/User';

export class InMemoryGetUserByIdRepository implements IGetUserByIdRepository {
  async getUserById(userId: string): Promise<User | undefined> {
    return users.find((user) => user.getId() === userId);
  }
}
