import { Task } from '../../../domain/entity/Task';
import { InMemoryCreateTaskRepository } from './InMemoryCreateTaskRepository';
import { SchedulingOption } from '../../../domain/entity/TaskInterface';

describe('InMemoryCreateTaskRepository Testing', () => {
  it('should create a task', async () => {
    const repo = new InMemoryCreateTaskRepository();
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const newTaskData = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.Flexible,
      timeslot,
      createdon: new Date(),
    });

    const createdTaskID = await repo.createTask(newTaskData);

    expect(createdTaskID).toBeDefined();
    expect(typeof createdTaskID).toBe('string');
    expect(createdTaskID).toHaveLength(36);
  });
});
