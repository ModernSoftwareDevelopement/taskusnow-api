import { CreatePostDTO } from '../../api/dtos/CreatePostDTO';
import { Post } from '../../domain/entity/Post';
import { v4 as uuidv4 } from 'uuid';

import { InMemoryPostRepository } from './InMemoryPostRepository';
import { add } from 'winston';

const id: string = uuidv4();
let category: string;
let content: string;
let userid: string;
let userName: string;

const init = () => {
  return {
    category,
    content,
    userid,
    userName,
  };
};

const addPost = async () => {
  const repo = new InMemoryPostRepository();
  const postDTO: CreatePostDTO = init();
  const post: Post = await repo.add(postDTO);
  return post;
};

beforeEach(() => {
  category = 'rental';
  content = 'Looking for a room for a family';
  userid = '111';
  userName = 'Dummy';
});

describe('InMemoryPostRepository function tests', () => {
  it('should list all posts', async () => {
    const repo = new InMemoryPostRepository();
    const post = await addPost();
    expect((await repo.getAll()).length).toBeGreaterThan(0);
  });

  it('should add Post', async () => {
    const post = await addPost();
    expect(post.Id).toBeTruthy();
  });

  it('should update Post', async () => {
    const repo = new InMemoryPostRepository();
    const post = await addPost();
    post.category = 'test 2';
    const updatedPost = await repo.update(post);
    expect(updatedPost.category).toBe('test 2');
  });

  it('should get by ID', async () => {
    const repo = new InMemoryPostRepository();
    const post = await addPost();
    const foundPost = await repo.getByID(post.Id);
    expect(foundPost.content).toBe(post.content);
  });

  it('should remove Post', async () => {
    const repo = new InMemoryPostRepository();
    const post = await addPost();
    const result = await repo.remove(post.Id);
    expect(result).toBe(true);
    expect(async () => {
      await repo.getByID(post.Id);
    }).rejects.toThrow();
  });

  it('should be able to search Post', async () => {
    const repo = new InMemoryPostRepository();
    const post = await addPost();

    const foundPost = await repo.search(category);
    expect(foundPost).toBeDefined;
    expect(foundPost[0].category).toBe(category);
  });
});
