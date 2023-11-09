import { GetTaskDTO } from './GetTaskDTO';

describe('GetTaskDTO Testing!', () => {
  it('should validate a valid GetTaskDTO object', () => {
    const validData: GetTaskDTO = {
      taskId: 'task123',
      title: 'Sample Task',
      description: 'This is a sample task',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
    };

    expect(validData).toBeDefined();
    expect(typeof validData.title).toBe('string');
    expect(typeof validData.description).toBe('string');
    expect(typeof validData.user.userId).toBe('string');
    if (validData.taskId) {
      expect(typeof validData.taskId).toBe('string');
    }
  });

  it('should handle incomplete GetTaskDTO object', () => {
    const incompleteData: Partial<GetTaskDTO> = {
      title: 'Incomplete Task',
      description: 'This task lacks a user ID',
    };

    expect(incompleteData.title).toBeDefined();
    expect(incompleteData.description).toBeDefined();
    expect(incompleteData.user?.userId).toBeUndefined();
  });

  it('should handle empty object', () => {
    const emptyData: GetTaskDTO = {} as GetTaskDTO;

    expect(emptyData).toBeDefined();
    expect(emptyData.title).toBeUndefined();
    expect(emptyData.description).toBeUndefined();
    expect(emptyData.user).toBeUndefined();
    expect(emptyData.taskId).toBeUndefined();
  });
});
