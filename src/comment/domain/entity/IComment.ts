export interface IComment {
    id: number;
    user: User;
    createdAt: string;
    content: string;
  }

export interface User {
  userId: string;
  imageUrl?: string;
  fullName?: string;
}