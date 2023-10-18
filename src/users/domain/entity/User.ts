import { randomUUID } from 'crypto';

export class User {
  private readonly id: string;
  private readonly email: string;
  private imageUrl?: string;
  private fullName?: string;

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

  getImageUrl(): string | undefined {
    return this.imageUrl;
  }

  setImageUrl(imageUrl: string | undefined): void {
    this.imageUrl = imageUrl;
  }

  getFullName(): string | undefined {
    return this.fullName;
  }

  setFullName(fullName: string | undefined): void {
    this.fullName = fullName;
  }
}
