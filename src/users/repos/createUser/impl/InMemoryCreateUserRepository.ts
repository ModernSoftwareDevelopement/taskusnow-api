import { ICreateUserRepository } from '../ICreateUserRepository';
import { User } from '../../../domain/entity/User';

export class InMemoryCreateUserRepository implements ICreateUserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
