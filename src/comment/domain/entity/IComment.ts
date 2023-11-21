export interface IComment {
    id: number;
    author: {
        authorId: number;
        avatar: string;
        name: string;
      };
    insertedAt: string;
    body: string;
  }
  