import { PostInterface } from '../../domain/entity/PostInterface';

export interface CreatePostDTO {
  category?: string;
  content: string;
  userid: string;
  userName: string;
}
