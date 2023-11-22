import { GetCommentDTO } from '../../repos/dtos/GetCommentDto';

export interface GetCommentsResponse {
  comments: GetCommentDTO[];
}
