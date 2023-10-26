import { randomUUID } from 'crypto'

export class Review {
  private readonly id: string
  private readonly userId: string
  private readonly userReview: string

  constructor(userId: string, userReview: string) {
    this.id = randomUUID()
    this.userId = userId
    this.userReview = userReview
  }

  getId(): string {
    return this.id
  }

  getUserId(): string {
    return this.userId
  }

  getUserReview(): string {
    return this.userReview
  }
}
