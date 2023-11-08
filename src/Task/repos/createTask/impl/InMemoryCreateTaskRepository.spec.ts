import { Task } from '../../../domain/entity/Task';
import { InMemoryCreateTaskRepository } from './InMemoryCreateTaskRepository';

describe('InMemoryCreateTaskRepository Testing', () => {
  it('should create a task', async () => {
    const repo = new InMemoryCreateTaskRepository();
    const newTaskData = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      userid: 123,
    });

    const createdTaskID = await repo.createTask(newTaskData);

    expect(createdTaskID).toBeDefined();
    expect(typeof createdTaskID).toBe('string');
    expect(createdTaskID).toHaveLength(36);
  });
});
