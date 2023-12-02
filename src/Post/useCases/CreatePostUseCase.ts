import { ValidationError } from '../../middleware/ValdationError';
import { CreatePostDTO } from '../api/dtos/CreatePostDTO';
import { Post } from '../domain/entity/Post';
import { IPostRepository } from '../repos/IPostRepository';

export class CreatePostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(postDTO: CreatePostDTO): Promise<Post | undefined> {
    try {
      const post = new Post({ id: '', ...postDTO });
      const validation = post.validate();

      if (!validation.valid) {
        throw new ValidationError(validation.error);
      }
      return await this.postRepository.add(postDTO);
    } catch (err) {
      const errMsg: string = (err as Error).message;
      throw new Error(`Something went wrong. Return Message: ${errMsg}`);
    }
  }
}
