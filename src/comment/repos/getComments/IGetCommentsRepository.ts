import { GetCommentDTO } from '../dtos/GetCommentDto';

export interface IGetCommentsRepository {
  getComments(): Promise<GetCommentDTO[]>;
}
