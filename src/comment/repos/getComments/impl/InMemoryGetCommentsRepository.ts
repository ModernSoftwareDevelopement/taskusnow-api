import { IGetCommentsRepository } from '../IGetCommentsRepository';
import { InMemoryComments } from '../../../database/inMemoryDB/InMemoryCommentsDatabase';
import { GetCommentDTO } from '../../dtos/GetCommentDto';

export class InMemoryGetCommentsRepository implements IGetCommentsRepository {
  async getComments(): Promise<GetCommentDTO[]> {
    return InMemoryComments;
  }
}