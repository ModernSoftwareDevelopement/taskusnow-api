// src/interfaces/UserRepository.ts
import User from '../User'

interface UserRepository {
  findById(id: string): Promise<User | undefined>
  create(user: User): Promise<void>
}

export default UserRepository
