// src/repositories/UserRepositoryImpl.ts
import User from './User'
import UserRepository from './interface/UserRepository'

const users: User[] = []

class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User | undefined> {
    return users.find((user) => user.id === id)
  }

  async create(user: User): Promise<User | undefined> {
    users.push(user)
    return user
  }
}

export default UserRepositoryImpl
