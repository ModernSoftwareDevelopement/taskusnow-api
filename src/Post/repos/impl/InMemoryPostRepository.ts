import { Post } from '../../domain/entity/Post';
import { IPostRepository } from '../IPostRepository';
import { posts } from '../../database/InMemoryDatabase';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';

export class InMemoryPostRepository implements IPostRepository {
  async getAllPosts(): Promise<Post[]> {
    return posts;
  }
  async createPost(post: Post): Promise<Post> {
    try {
      const newID: string = uuidv4();
      post.Id = newID;
      posts.push(post);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async getPostByID(id: string): Promise<Post> {
    const post = posts.find((p) => p.Id === id);
    if (post) {
      return post;
    } else {
      throw new Error('Unable to create Post!');
    }
  }

  async searchPost(post: Post): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }

  async removePost(id: string): Promise<boolean> {
    const index: number = posts.findIndex((p) => p.Id === id);
    if (index) {
      posts.splice(index, 1);
      return true;
    } else {
      throw new Error('Unable to remove Post');
    }
  }
}
