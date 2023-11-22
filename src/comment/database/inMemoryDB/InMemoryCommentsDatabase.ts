import { GetCommentDTO } from '../../repos/dtos/GetCommentDto';

export const InMemoryComments: GetCommentDTO[] = [
    {
        id: 1,
        author: {
          authorId: 1,
          avatar: 'avatar-url-1',
        name: 'EMP'
        },
        insertedAt: '2023-11-19T12:00:00',
        body: 'This is a first comment.',
      },
    {
        id: 2,
        author: {
          authorId: 2,
          avatar: 'avatar-url-2',
        name: 'TU'
        },
        insertedAt: '2023-11-19T12:10:00',
        body: 'This is a testing comment.',
      },
    
];