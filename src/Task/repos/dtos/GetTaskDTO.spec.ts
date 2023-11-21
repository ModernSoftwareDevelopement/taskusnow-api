import { GetTaskDto } from './GetTaskDTO';
import { SchedulingOption } from '../../domain/entity/TaskInterface'

describe('GetTaskDTO Testing!', () => {
  it('should validate a valid GetTaskDTO object', () => {
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const validData: GetTaskDto = {
      taskId: 'task123',
      title: 'Sample Task',
      description: 'This is a sample task',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot,
      createdAt: new Date(),
    };

    expect(validData).toBeDefined();
    expect(typeof validData.title).toBe('string');
    expect(typeof validData.description).toBe('string');
    expect(typeof validData.user.userId).toBe('string');
    expect(typeof validData.category).toBe('string');
    expect(typeof validData.location).toBe('string');
    expect(typeof validData.budget).toBe('number');
    expect(typeof validData.scheduling).toBe('string');
    expect(typeof validData.timeslot?.startTime).toBe('string');
    expect(typeof validData.timeslot?.endTime).toBe('string');
    expect(typeof validData.createdAt).toBe('object');
    if (validData.taskId) {
      expect(typeof validData.taskId).toBe('string');
    }
  });

  it('should handle incomplete GetTaskDTO object', () => {
    const incompleteData: Partial<GetTaskDto> = {
      title: 'Incomplete Task',
      description: 'This task lacks a user ID',
    };

    expect(incompleteData.title).toBeDefined();
    expect(incompleteData.description).toBeDefined();
    expect(incompleteData.user?.userId).toBeUndefined();
    expect(incompleteData.category).toBeUndefined();
    expect(incompleteData.location).toBeUndefined();
    expect(incompleteData.budget).toBeUndefined();
    expect(incompleteData.scheduling).toBeUndefined();
    expect(incompleteData.createdAt).toBeUndefined();
  });

  it('should handle empty object', () => {
    const emptyData: GetTaskDto = {} as GetTaskDto;

    expect(emptyData).toBeDefined();
    expect(emptyData.title).toBeUndefined();
    expect(emptyData.description).toBeUndefined();
    expect(emptyData.user).toBeUndefined();
    expect(emptyData.taskId).toBeUndefined();
    expect(emptyData.category).toBeUndefined();
    expect(emptyData.location).toBeUndefined();
    expect(emptyData.budget).toBeUndefined();
    expect(emptyData.scheduling).toBeUndefined();
    expect(emptyData.createdAt).toBeUndefined();
  });
});
