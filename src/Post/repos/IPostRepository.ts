import { Post } from '../domain/entity/Post';

export interface IPostRepository {
  getAllPosts(): Promise<Post[]>;
  createPost(post: Post): Promise<Post>;
  getPostByID(id: string): Promise<Post>;
  searchPost(searchString: string): Promise<Post[]>;
  removePost(id: string): Promise<boolean>;
}
