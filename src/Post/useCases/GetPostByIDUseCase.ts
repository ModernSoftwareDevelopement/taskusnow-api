import { Post } from '../domain/entity/Post';
import { IPostRepository } from '../repos/IPostRepository';

export class GetPostByIDUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(id: string): Promise<Post | undefined> {
    try {
      const post = await this.postRepository.getByID(id);

      if (!post) {
        throw new Error('Post not found!');
      } else {
        return post;
      }
    } catch (err) {
      const errMsg: string = (err as Error).message;
      throw new Error(`Something went wrong. Return Message: ${errMsg}`);
    }
  }
}
