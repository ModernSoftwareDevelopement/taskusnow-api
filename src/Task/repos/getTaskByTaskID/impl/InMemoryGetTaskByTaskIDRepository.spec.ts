import { InMemoryGetTaskByTaskIDRepository } from './InMemoryGetTaskByTaskIDRepository';

const inMemoryGetTaskByTaskIDRepo: InMemoryGetTaskByTaskIDRepository = {
  getTaskByTaskID: jest.fn(),
};

const getTaskByTaskIDMock =
  inMemoryGetTaskByTaskIDRepo.getTaskByTaskID as jest.Mock;

describe('InMemoryGetTaskByTaskIDRepository Testing', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should get a task by valid Task ID', async () => {
    getTaskByTaskIDMock.mockResolvedValue({
      taskId: 'generatedTaskID',
      title: 'sample title',
      description: 'sample description',
      userid: 123,
    });

    const taskIDToGet: string = 'generatedTaskID';
    const getTask =
      await inMemoryGetTaskByTaskIDRepo.getTaskByTaskID(taskIDToGet);

    expect(getTask).toEqual({
      taskId: 'generatedTaskID',
      title: 'sample title',
      description: 'sample description',
      userid: 123,
    });
  });

  it('should throw an error if task with given ID is not found', async () => {
    getTaskByTaskIDMock.mockRejectedValue(
      new Error('Task with ID nonExistentTask not found'),
    );

    const taskIDToGet: string = 'nonExistentTask';

    try {
      await inMemoryGetTaskByTaskIDRepo.getTaskByTaskID(taskIDToGet);
      // The code should not reach here; an error should be thrown
      expect(true).toBe(false);
    } catch (error) {
      const typedError = error as Error;
      expect(typedError.message).toBe(`Task with ID ${taskIDToGet} not found`);
    }
  });
});
