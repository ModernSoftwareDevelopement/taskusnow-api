import { CreateTaskRepoInterface } from '../ICreateTaskRepository';
import { Task } from '../../../domain/entity/Task';
import { InMemoryCreateTaskRepository } from './InMemoryCreateTaskRepository';
import { v4 as uuidv4 } from 'uuid';

class MockInMemoryCreateDataSource implements CreateTaskRepoInterface {
  private tasks: Task[] = [];

  async createTask(taskData: Task): Promise<string> {
    const taskID: string = uuidv4();
    taskData.taskId = taskID;

    this.tasks.push(taskData);

    return taskData.taskId as string;
  }
}

describe('InMemoryCreateTaskRepository Testing', () => {
  let inMemoryCreateTaskRepository: InMemoryCreateTaskRepository;

  beforeEach(() => {
    inMemoryCreateTaskRepository = new MockInMemoryCreateDataSource();
  });

  it('should create a task', async () => {
    const newTaskData = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      userid: 123,
    });

    const createdTaskID =
      await inMemoryCreateTaskRepository.createTask(newTaskData);

    expect(createdTaskID).toBeDefined();
    expect(typeof createdTaskID).toBe('string');
    expect(createdTaskID).toHaveLength(36);
  });
});
