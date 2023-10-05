import {Post} from "../domain/entity/Post";

export interface IPostRepository
{
    createPost (post: Post): Promise<Post |null>;
    getPostByID (id: string): Promise<Post | null>;
    searchPost (post: Post): Promise<Post[] | null>;
    removePost (post: Post): Promise<boolean>;    
}