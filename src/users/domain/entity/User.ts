import { randomUUID } from 'crypto';

export class User {
  private readonly id: string;
  private readonly email: string;

  constructor(email: string) {
    this.id = randomUUID();
    this.email = email;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
}
