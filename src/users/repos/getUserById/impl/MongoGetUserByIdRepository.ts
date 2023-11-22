import { IGetUserByIdRepository } from '../IGetUserByIdRepository';
import { UserModel } from '../../../database/mongo/models/User.model';
import { User } from '../../../domain/entity/User';

export class MongoGetUserByIdRepository implements IGetUserByIdRepository {
  async getUserById(id: string): Promise<User> {
    const result = await UserModel.findById(id);

    if (!result) throw new Error('User not found');

    //todo need to enhance this
    return User.create(
      {
        email: result.email,
        email_2: result.email_2,
        fullName: result.fullName,
        imageUrl: result.imageUrl,
        address: result.address,
        address_2: result.address_2,
        phone: result.phone,
      },
      result._id,
    );
  }
}
