import { User } from '../domain/entity/User';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
}
