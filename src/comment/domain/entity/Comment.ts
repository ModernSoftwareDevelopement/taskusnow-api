import {IComment, User} from './IComment';

export class Comment{
    private id: number;
    private user: User;
    private createdAt: string;
    private content: string;

    constructor(data: IComment) {
        this.id = data.id;
        this.user = data.user;
        this.createdAt = data.createdAt;
        this.content = data.content;
      }
    
    getId(): number {
        return this.id;
    }

    getUser(): {
        userId: string;
        imageUrl?: string;
        fullName?: string;
    } {
        return this.user;
    }
    
    setUser(newUser: {
        userId: string;
        imageUrl: string;
        fullName: string;
    }) {
    
        this.user = newUser;
    }

    getCreatedAt(): string {
        return this.createdAt;
    }

    setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    getContent(): string {
        return this.content;
    }

    setContent(content: string): void {
        this.content = content;
    }
    
}