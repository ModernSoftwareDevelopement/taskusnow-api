import { GetCommentDto } from '../dtos/GetCommentDto';

export interface IGetCommentsRepository {
  getComments(): Promise<GetCommentDto[]>;
}
