import { User } from '../../domain/entity/User';
import { UpdateUserDTO } from '../../api/dtos/UpdateUserDTO';

export interface IUpdateUserRepository {
  updateUser(userId: string, data: UpdateUserDTO): Promise<User>;
}
