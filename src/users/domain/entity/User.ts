import { randomUUID } from 'crypto';

interface IUserProperties {
  email: string;
  imageUrl?: string;
  fullName?: string;
  email_2?: string;
  address?: string;
  address_2?: string;
  phone?: string;
}

export class User {
  private readonly id: string;
  private readonly email: string;
  private imageUrl?: string;

  private fullName?: string;
  private email_2?: string;
  private address?: string;
  private address_2?: string;
  private phone?: string;

  private constructor(email: string, id?: string) {
    this.id = id ?? randomUUID();
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

  public static create(props: IUserProperties, id?: string): User {
    const user = new User(props.email, id);

    user.setImageUrl(props.imageUrl);
    user.setFullName(props.fullName);
    user.setEmail_2(props.email_2);
    user.setAddress(props.address);
    user.setAddress_2(props.address_2);
    user.setPhone(props.phone);

    return user;
  }

  public serialize(): IUserProperties {
    return {
      email: this.email,
      imageUrl: this.imageUrl,
      fullName: this.fullName,
      email_2: this.email_2,
      address: this.address,
      address_2: this.address_2,
      phone: this.phone,
    };
  }
}
