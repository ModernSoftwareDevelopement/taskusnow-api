import { InMemoryGetTaskByTaskIDRepository } from './InMemoryGetTaskByTaskIDRepository';

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
      userid: 123,
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
