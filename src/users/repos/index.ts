import { InMemoryUpdateUserByIdRepository } from './updateUser/impl/InMemoryUpdateUserByIdRepository';
import { MongoCreateUserRepository } from './createUser/impl/MongoCreateUserRepository';
import { MongoGetUserByIdRepository } from './getUserById/impl/MongoGetUserByIdRepository';

const createUserRepository = new MongoCreateUserRepository();
const getUserByIdRepository = new MongoGetUserByIdRepository();
const updateUserRepository = new InMemoryUpdateUserByIdRepository();

export { createUserRepository, getUserByIdRepository, updateUserRepository };
