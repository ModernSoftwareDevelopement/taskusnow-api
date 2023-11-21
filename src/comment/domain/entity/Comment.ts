import {IComment} from './IComment';
export class Comment{
    private id: number;
    private author: {
        authorId?: number;
        avatar: string;
        name: string;
    };
    private insertedAt: string;
    private body: string;

    constructor(data: IComment) {
        this.id = data.id;
        this.author = data.author;
        this.insertedAt = data.insertedAt;
        this.body = data.body;
      }
    
    getId(): number {
        return this.id;
    }

    getAuthor(): {
        authorId?: number;
        avatar: string;
        name: string;
    } {
        return this.author;
    }
    
    setAuthor(newAuthor: {
    authorId?: number;
    avatar: string;
    name: string;
    }) {
    
        this.author = newAuthor;
    }

    getInsertedAt(): string {
        return this.insertedAt;
    }

    setInsertedAt(insertedAt: string): void {
        this.insertedAt = insertedAt;
    }

    getBody(): string {
        return this.body;
    }

    setBody(body: string): void {
        this.body = body;
    }
    
}