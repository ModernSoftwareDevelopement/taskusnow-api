import { PostInterface } from './PostInterface';

export class Post {
  private id: string;
  public category?: string;
  public content: string;
  public userid: string;
  public userName: string;

  constructor(data: PostInterface) {
    this.id = data.id;
    this.category = data.category;
    this.content = data.content;
    this.userid = data.userid;
    this.userName = data.userName;
  }

  get Id() {
    return this.id;
  }

  set Id(value: string) {
    this.id = value;
  }

  validate(): { valid: boolean; error?: string } {
    if (!this.content || !this.category) {
      return { valid: false, error: 'Invalid content or category' };
    }

    if (!this.userid || !this.userName) {
      return { valid: false, error: 'Invalid user info' };
    }

    return { valid: true };
  }
}
