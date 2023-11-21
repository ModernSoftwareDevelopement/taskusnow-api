import { GetTaskDto } from './../dtos/GetTaskDTO';
import { SchedulingOption } from '../../domain/entity/TaskInterface';

export const InMemoryTasks: GetTaskDto[] = [
  {
    taskId: 'generatedTaskID',
    title: 'sample title',
    description: 'sample description',
    user: {
      userId: 'user123',
      fullName: 'John Doe',
    },
    category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot: {
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },     
      createdAt: new Date('2023-11-10'),
  },
];
