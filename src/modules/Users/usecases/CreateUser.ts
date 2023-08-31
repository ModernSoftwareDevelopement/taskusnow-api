// src/usecases/CreateUserReview.ts
import User from '../User'
import UserRepository from '../interface/UserRepository'

class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string, name: string): Promise<void> {
    const newuser = new User(userId, name)
    await this.userRepository.create(newuser)
  }
}

export default CreateUser
