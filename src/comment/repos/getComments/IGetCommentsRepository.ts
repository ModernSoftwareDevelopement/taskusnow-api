import { GetCommentDTO } from '../dtos/GetCommentDTO';

export interface IGetCommentsRepository {
  getComments(): Promise<GetCommentDTO[]>;
}
