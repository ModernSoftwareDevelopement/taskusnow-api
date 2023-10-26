import { randomUUID } from 'crypto';

export class User {
  private readonly id: string;
  private readonly email: string;
  private imageUrl?: string;

  private fullName?: string;
  private email_2?: string;
  private address?: string;
  private address_2?: string;
  private phone?: string;

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

  getEmail_2(): string | undefined {
    return this.email_2;
  }

  setEmail_2(email_2: string | undefined): void {
    this.email_2 = email_2;
  }

  getAddress(): string | undefined {
    return this.address;
  }

  setAddress(address: string | undefined): void {
    this.address = address;
  }

  getAddress_2(): string | undefined {
    return this.address_2;
  }

  setAddress_2(address_2: string | undefined): void {
    this.address_2 = address_2;
  }

  getPhone(): string | undefined {
    return this.phone;
  }

  setPhone(phone: string | undefined): void {
    this.phone = phone;
  }
}
