import {User} from '../../domain/entity/IComment'
export interface GetCommentDto{
    id: number;
    user: User;
    createdAt: string;
    content: string;
}