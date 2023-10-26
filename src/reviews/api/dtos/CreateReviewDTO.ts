export class CreateReviewDTO {
  private readonly userId: string
  private readonly userReview: string

  constructor(userId: string, userReview: string) {
    this.userId = userId
    this.userReview = userReview
  }

  getUserId(): string {
    return this.userId
  }

  getUserReview(): string {
    return this.userReview
  }
}
