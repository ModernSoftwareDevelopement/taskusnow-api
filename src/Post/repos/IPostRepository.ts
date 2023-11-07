import { Post } from '../domain/entity/Post';

export interface IPostRepository {
  getAll(): Promise<Post[]>;
  add(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  getByID(id: string): Promise<Post>;
  search(searchString: string): Promise<Post[]>;
  remove(id: string): Promise<boolean>;
}
