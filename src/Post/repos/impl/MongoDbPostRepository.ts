import { Post } from '../../domain/entity/Post';
import { IPostRepository } from '../IPostRepository';
import { posts } from '../../database/InMemoryDatabase';
import { v4 as uuidv4 } from 'uuid';

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
  searchPost(post: Post): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  removePost(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
