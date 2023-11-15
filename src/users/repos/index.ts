import { MongoCreateUserRepository } from './createUser/impl/MongoCreateUserRepository';
import { MongoGetUserByIdRepository } from './getUserById/impl/MongoGetUserByIdRepository';
import { MongoUpdateUserByIdRepository } from './updateUser/impl/MongoUpdateUserByIdRepository';

const createUserRepository = new MongoCreateUserRepository();
const getUserByIdRepository = new MongoGetUserByIdRepository();
const updateUserRepository = new MongoUpdateUserByIdRepository();

export { createUserRepository, getUserByIdRepository, updateUserRepository };
