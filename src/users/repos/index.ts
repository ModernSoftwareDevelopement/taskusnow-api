import { InMemoryCreateUserRepository } from './createUser/impl/InMemoryCreateUserRepository';

const userRepo = new InMemoryCreateUserRepository();

export { userRepo };
