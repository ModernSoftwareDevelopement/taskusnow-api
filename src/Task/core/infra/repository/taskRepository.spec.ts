import Task from '../../entity/Task';
import { TaskRepository } from '../repository/taskRepository';
import { TaskInterface } from '../interface/taskInterface';

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

describe('TaskRepository', () => {
  it('should get an empty list of tasks', async () => {
    const mockDataSource = new MockDataSource();
    const taskRepository = new TaskRepository(mockDataSource);

    const tasks = await taskRepository.getTasks();
    expect(tasks).toEqual([]);
  });

  it('should create a task', async () => {
    const mockDataSource = new MockDataSource();
    const taskRepository = new TaskRepository(mockDataSource);

    const newTaskData = new Task('Sample Title', 'Sample Description', 123);
    const createdTask = await taskRepository.createTask(newTaskData);

    expect(createdTask).toEqual(newTaskData);
  });
});
