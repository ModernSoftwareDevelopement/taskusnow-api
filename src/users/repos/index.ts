import { InMemoryCreateUserRepository } from './createUser/impl/InMemoryCreateUserRepository';
import { InMemoryGetUserByIdRepository } from './getUserById/impl/InMemoryGetUserByIdRepository';
import { InMemoryUpdateUserByIdRepository } from './updateUser/impl/InMemoryUpdateUserByIdRepository';

const createUserRepository = new InMemoryCreateUserRepository();
const getUserByIdRepository = new InMemoryGetUserByIdRepository();
const updateUserRepository = new InMemoryUpdateUserByIdRepository();

export { createUserRepository, getUserByIdRepository, updateUserRepository };
