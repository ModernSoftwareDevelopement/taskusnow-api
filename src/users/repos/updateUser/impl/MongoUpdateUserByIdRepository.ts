import { IUpdateUserRepository } from '../IUpdateUserRepository';
import { UserModel } from '../../../database/mongo/models/User.model';
import { UpdateUserDto } from '../../../api/dtos/UpdateUserDto';

export class MongoUpdateUserByIdRepository implements IUpdateUserRepository {
  async updateUser(id: string, data: UpdateUserDto): Promise<string> {
    const result = await UserModel.findByIdAndUpdate(id, data);

    if (!result) throw new Error('User not found');

    return result._id;
  }
}
