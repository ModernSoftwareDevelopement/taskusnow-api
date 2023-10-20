import { InMemoryCreateUserRepository } from './createUser/impl/InMemoryCreateUserRepository';
import { InMemoryGetUserByIdRepository } from './getUserById/impl/InMemoryGetUserByIdRepository';

const createUserRepository = new InMemoryCreateUserRepository();
const getUserByIdRepository = new InMemoryGetUserByIdRepository();

export { createUserRepository, getUserByIdRepository };
