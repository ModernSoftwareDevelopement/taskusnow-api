export class GetReviewDTO {
  private readonly id: string;
  private readonly userId: string;

  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }

  getUserId(): string {
    return this.userId;
  }

  getId(): string {
    return this.id;
  }
}
