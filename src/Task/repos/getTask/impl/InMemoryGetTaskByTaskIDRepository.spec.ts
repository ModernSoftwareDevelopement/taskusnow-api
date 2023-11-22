import { InMemoryGetTaskByTaskIDRepository } from './InMemoryGetTaskByTaskIDRepository';
import { SchedulingOption } from '../../../domain/entity/TaskInterface';

describe('InMemoryGetTaskByTaskIDRepository Testing', () => {
  let repository: InMemoryGetTaskByTaskIDRepository;

  beforeEach(() => {
    repository = new InMemoryGetTaskByTaskIDRepository();
  });

  it('should get a task by valid Task ID', async () => {
    const taskIDToGet: string = 'generatedTaskID';
    const getTask = await repository.getTaskByTaskID(taskIDToGet);

    expect(getTask).toEqual({
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
    });
  });

  it('should throw an error if task with given ID is not found', async () => {
    const taskIDToGet: string = 'nonExistentTask';

    try {
      await repository.getTaskByTaskID(taskIDToGet);
      // The code should not reach here; an error should be thrown
      expect(true).toBe(false);
    } catch (error) {
      const typedError = error as Error;
      expect(typedError.message).toBe(`Task with ID ${taskIDToGet} not found`);
    }
  });
});
