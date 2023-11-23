import { IGetCommentsRepository } from '../IGetCommentsRepository';
import { InMemoryComments } from '../../../database/inMemoryDB/InMemoryCommentsDatabase';
import { GetCommentDto } from '../../dtos/GetCommentDto';

export class InMemoryGetCommentsRepository implements IGetCommentsRepository {
  async getComments(): Promise<GetCommentDto[]> {
    return InMemoryComments;
  }
}