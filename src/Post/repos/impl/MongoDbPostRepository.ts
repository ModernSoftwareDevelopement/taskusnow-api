import { Post } from '../../domain/entity/Post';
import { IPostRepository } from '../IPostRepository';

export class MongoDbPostRepository implements IPostRepository {
  getAllPosts(): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  createPost(post: Post): Promise<Post> {
    throw new Error('Method not implemented.');
  }
  getPostByID(id: string): Promise<Post> {
    throw new Error('Method not implemented.');
  }
  searchPost(searchString: string): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  removePost(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
