// src/entities/Review.ts
class Review {
  constructor(
    private id: string,
    private userId: string,
    private text: string,
  ) {}

  get Id(): string {
    return this.id
  }
}

export default Review
