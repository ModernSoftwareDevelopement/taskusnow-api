import { User } from '../../domain/entity/User';

export interface ICreateUserRepository {
  createUser(user: User): Promise<User>;
}
