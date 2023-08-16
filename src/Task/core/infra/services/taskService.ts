import Task from '../../entity/Task';
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
    const tmpTask = new Task(taskData.title,taskData.description,taskData.userid);
    const validation = tmpTask.taskIsValid();

    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return this.taskRepository.createTask(tmpTask);
  }
}
