import { GetCommentDto } from '../../repos/dtos/GetCommentDto';

export interface GetCommentsResponse {
  comments: GetCommentDto[];
}
