import { ICreateUserRepository } from '../ICreateUserRepository';
import { User } from '../../../domain/entity/User';
import { UserModel } from '../../../database/mongo/models/User.model';

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(user: User): Promise<User> {
    await UserModel.create({
      _id: user.getId(),
      email: user.getEmail(),
      fullName: user.getFullName(),
      imageUrl: user.getImageUrl(),
      address: user.getAddress(),
      address_2: user.getAddress_2(),
      phone: user.getPhone(),
    });

    return user;
  }
}
