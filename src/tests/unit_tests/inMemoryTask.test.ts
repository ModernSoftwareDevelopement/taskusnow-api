import Task from '../../core/entity/Task';
import { InMemoryDataSource } from '../../core/infra/dataSource/inMemoryTask';

describe('InMemoryDataSource Tests', () => {
  let inMemoryDataSource: InMemoryDataSource;

  beforeEach(() => {
    inMemoryDataSource = new InMemoryDataSource();
  });

  it('returns an empty array for getTasks initially', async () => {
    const tasks = await inMemoryDataSource.getTasks();
    expect(tasks).toEqual([]);
  });

  it('adds a task to the tasks array when createTask is called', async () => {
    const newTask: Task = new Task('Test Title', 'Test Description', 1);
    await inMemoryDataSource.createTask(newTask);
    const tasks = await inMemoryDataSource.getTasks();
    expect(tasks).toContainEqual(newTask);
  });

  // Add more tests to cover other scenarios and edge cases
});
