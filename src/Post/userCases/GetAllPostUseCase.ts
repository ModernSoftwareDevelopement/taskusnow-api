import { Post } from '../domain/entity/Post';
import { IPostRepository } from '../repos/IPostRepository';

export class GetAllPostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(): Promise<Post[]> {
    return await this.postRepository.getAll();
  }
}
