import { UpdateUserDto } from '../../api/dtos/UpdateUserDto';

export interface IUpdateUserRepository {
  updateUser(userId: string, data: UpdateUserDto): Promise<string>;
}
