import { IUserRepository } from '../IUserRepository';
import { User } from '../../domain/entity/User';

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
