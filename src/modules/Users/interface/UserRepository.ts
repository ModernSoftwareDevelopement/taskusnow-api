// src/interfaces/UserRepository.ts
import User from '../User'

interface UserRepository {
  findById(id: string): Promise<User | undefined>
  create(user: User): Promise<User | undefined>
}

export default UserRepository
