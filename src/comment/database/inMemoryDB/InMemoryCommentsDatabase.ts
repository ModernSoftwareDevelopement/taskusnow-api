import { GetCommentDto } from '../../repos/dtos/GetCommentDto';

export const InMemoryComments: GetCommentDto[] = [
    {
        id: 1,
        user: {
          userId: '1',
          imageUrl: 'avatar-url-1',
          fullName: 'EMP'
        },
        createdAt: new Date().toISOString(),
        content: 'This is a first comment.',
      },
    {
        id: 2,
        user: {
          userId: '2',
          imageUrl: 'avatar-url-2',
          fullName: 'TU'
        },
        createdAt: new Date().toISOString(),
        content: 'This is a testing comment.',
      },
    
];