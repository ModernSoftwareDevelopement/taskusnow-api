// src/repositories/UserRepositoryImpl.ts
import User from './User'
import UserRepository from './interface/UserRepository'

const users: User[] = []

class UserRepositoryImpl implements UserRepository {
  async findById(id: string): Promise<User | undefined> {
    return users.find((user) => user.id === id)
  }

  async create(user: User): Promise<void> {
    users.push(user)
  }
}

export default UserRepositoryImpl
