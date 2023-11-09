import { Post } from '../../domain/entity/Post';
import { IPostRepository } from '../IPostRepository';
import { posts } from '../../database/InMemoryDatabase';
import { v4 as uuidv4 } from 'uuid';

export class InMemoryPostRepository implements IPostRepository {
  async getAll(): Promise<Post[]> {
    //if (posts) return posts;

    const post: Post = new Post({
      id: 'string',
      category: 'string',
      content: 'string',
      userid: 'string',
      userName: 'string',
    });
    return [post];
  }
  async add(post: Post): Promise<Post> {
    try {
      const newID: string = uuidv4();
      post.Id = newID;
      posts.push(post);
      return post;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async update(post: Post): Promise<Post> {
    try {
      const id = post.Id;
      const postIndex = posts.findIndex((p) => p.Id === id);
      posts[postIndex] = post;
      return post;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getByID(id: string): Promise<Post> {
    const post = posts.find((p) => p.Id === id);
    if (post) {
      return post;
    } else {
      throw new Error('Unable to create Post!');
    }
  }

  async search(searchString: string): Promise<Post[]> {
    const foundPosts = posts.filter(
      (p) =>
        p.category === searchString ||
        p.content === searchString ||
        p.userName === searchString,
    );
    if (foundPosts) {
      return foundPosts;
    } else {
      throw new Error('Unable to create Post!');
    }
  }

  async remove(id: string): Promise<boolean> {
    const index: number = posts.findIndex((p) => p.Id === id);
    if (index) {
      posts.splice(index, 1);
      return true;
    } else {
      throw new Error('Unable to remove Post');
    }
  }
}
