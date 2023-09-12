export class CreateUserDTO {
  private readonly email: string;

  constructor(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
