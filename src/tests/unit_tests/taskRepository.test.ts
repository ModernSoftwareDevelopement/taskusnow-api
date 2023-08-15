import Task from '../../core/entity/Task';
import { TaskRepository } from './../../core/infra/repositories/taskRepository';
import { TaskInterface } from './../../core/infra/dataSource/taskInterface';

class MockDataSource implements TaskInterface {
  private tasks: Task[] = [];

  async getTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(taskData: Task): Promise<Task> {
    this.tasks.push(taskData);
    return taskData;
  }
}

test('TaskRepository', async () => {
  const mockDataSource = new MockDataSource();
  const taskRepository = new TaskRepository(mockDataSource);

  // Test getTasks method
  const tasks = await taskRepository.getTasks();
  expect(tasks).toEqual([]);

  // Test createTask method
  const newTaskData = new Task('Sample Title', 'Sample Description', 123);
  const createdTask = await taskRepository.createTask(newTaskData);
  expect(createdTask).toEqual(newTaskData);
});
