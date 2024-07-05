import { GetCommentsResponse } from './GetCommentsResponse';
import { IGetCommentsRepository } from '../../repos/getComments/IGetCommentsRepository';

export class GetCommentsUseCase {
  constructor(private readonly commentsRepo: IGetCommentsRepository) {}

  async execute(): Promise<GetCommentsResponse> {
    const resultTask = await this.commentsRepo.getComments();
    return {
      comments: resultTask,
    };
  }
}