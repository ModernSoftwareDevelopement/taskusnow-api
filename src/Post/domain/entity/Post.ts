import { PostInterface } from './PostInterface';

export class Post {
  
  private id?: string;
  private category?: string;
  private content: string;
  private userid: string;
  private userName:string

  constructor(data: PostInterface) {
    this.id =data.id;
    this.category = data.category;
    this.content = data.content;
    this.userid = data.userid;
    this.userName = data.userName;
  }
  isValidObject(): { valid: boolean; error?: string } {
    if (!this.content || !this.category) {
      return { valid: false, error: "Invalid content or category" };
    }

    if (!this.userid || !this.userName) {
      return { valid: false, error: "Invalid user info" };
    }

    return { valid: true };
  }
}
