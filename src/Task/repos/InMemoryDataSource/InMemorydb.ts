import { GetTaskDTO } from './../dtos/GetTaskDTO';

export const InMemoryTasks: GetTaskDTO[] = [
  {
    taskId: 'generatedTaskID',
    title: 'sample title',
    description: 'sample description',
    userid: 123,
  },
];
