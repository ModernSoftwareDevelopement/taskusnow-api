import { InMemoryGetTasksRepository } from './InMemoryGetTasksRepository';

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
      },
    ]);
  });
});
