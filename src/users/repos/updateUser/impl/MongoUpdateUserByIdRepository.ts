import { IUpdateUserRepository } from '../IUpdateUserRepository';
import { UserModel } from '../../../database/mongo/models/User.model';
import { UpdateUserDto } from '../../../api/dtos/UpdateUserDto';

export class MongoUpdateUserByIdRepository implements IUpdateUserRepository {
  async updateUser(id: string, data: UpdateUserDto): Promise<string> {
    await UserModel.findByIdAndUpdate(id, data);

    return id;
  }
}
