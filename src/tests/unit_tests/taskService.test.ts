import Task from '../../core/entity/Task';
import { TaskService } from '../../core/infra/services/taskService';
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
  
  class MockTaskRepository implements TaskInterface {
    private tasks: Task[] = [];
  
    constructor(private dataSource: MockDataSource) {}
  
    async getTasks(): Promise<Task[]> {
      return this.dataSource.getTasks();
    }
  
    async createTask(taskData: Task): Promise<Task> {
      this.tasks.push(taskData);
      return taskData;
    }
  }
  
  test('TaskService', async () => {
    const mockDataSource = new MockDataSource();
    const mockTaskRepository = new MockTaskRepository(mockDataSource);
    const taskService = new TaskService(mockTaskRepository);
  
    // Test getTasks method
    const tasks = await taskService.getTasks();
    expect(tasks).toEqual([]);
  
    // Test createTask method with valid data
    const newTaskData = new Task('Sample Title', 'Sample Description', 123);
    const createdTask = await taskService.createTask(newTaskData);
    expect(createdTask).toEqual(newTaskData);
  
    // Test createTask method with invalid data
    const invalidTaskData = new Task('', 'Sample Description', 123);
    await expect(taskService.createTask(invalidTaskData)).rejects.toThrow(
      'Empty or invalid title or description'
    );
  });