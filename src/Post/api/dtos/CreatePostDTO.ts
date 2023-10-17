import { PostInterface } from '../../domain/entity/PostInterface';

export class CreatePostDTO {
  public category?: string;
  public content: string;
  public userid: string;
  public userName: string;

  constructor(data: PostInterface) {
    this.category = data.category;
    this.content = data.content;
    this.userid = data.userid;
    this.userName = data.userName;
  }
}
