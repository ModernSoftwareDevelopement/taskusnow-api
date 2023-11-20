import { InMemoryGetTasksRepository } from './InMemoryGetTasksRepository';
import { SchedulingOption } from '../../../domain/entity/TaskInterface';

describe('InMemoryGetTasksRepository Testing', () => {
  it('should get tasks', async () => {
    const repo = new InMemoryGetTasksRepository();

    const tasks = await repo.getTasks();

    expect(tasks).toEqual([
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
        createdon: new Date(2023-11-10),
      },
    ]);
  });
});
