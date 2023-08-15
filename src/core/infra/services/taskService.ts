import Task from '../../../core/entity/Task';
import { TaskInterface } from '../dataSource/taskInterface';

export class TaskService {
  private taskRepository: TaskInterface;

  constructor(taskRepository: TaskInterface) {
    this.taskRepository = taskRepository;
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  async createTask(taskData: Task): Promise<Task> {
    const validation = taskData.taskIsValid();

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return this.taskRepository.createTask(taskData);
  }
}
