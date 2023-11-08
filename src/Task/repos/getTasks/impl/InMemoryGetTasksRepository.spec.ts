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
        userid: 123,
      },
    ]);
  });
});
