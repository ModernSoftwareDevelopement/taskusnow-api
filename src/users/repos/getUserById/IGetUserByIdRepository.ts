import { User } from '../../domain/entity/User';

export interface IGetUserByIdRepository {
  getUserById(id: string): Promise<User | undefined>;
}
