import { GetTaskDTO } from './../dtos/GetTaskDTO';

export const InMemoryTasks: GetTaskDTO[] = [
  {
    taskId: 'generatedTaskID',
    title: 'sample title',
    description: 'sample description',
    user: {
      userId: 'user123',
      fullName: 'John Doe',
    },
  },
];
