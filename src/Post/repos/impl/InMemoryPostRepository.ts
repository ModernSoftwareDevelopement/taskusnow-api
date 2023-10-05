import {Post} from "../../domain/entity/Post";
import {IPostRepository} from "../IPostRepository";
import {posts} from "../../database/InMemoryDatabase"

export class InMemoryPostRepository implements IPostRepository
{
    async createPost(post: Post): Promise<Post | null> {
        if(post.isValidObject())
        {
            posts.push(post);
            return post;
        }
        else
        {
            return null;
        }
    }
    
    async getPostByID(id: string): Promise<Post | null> {
        throw new Error("Method not implemented.");
    }
    async searchPost(post: Post): Promise<Post[] | null> {
        throw new Error("Method not implemented.");
    }
    async removePost(post: Post): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}
