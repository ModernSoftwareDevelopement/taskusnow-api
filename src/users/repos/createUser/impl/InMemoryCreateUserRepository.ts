import { ICreateUserRepository } from '../ICreateUserRepository';
import { User } from '../../../domain/entity/User';
import { users } from '../../../database/inMemoryDatabase';

export class InMemoryCreateUserRepository implements ICreateUserRepository {
  async createUser(user: User): Promise<User> {
    users.push(user);
    return user;
  }
}
