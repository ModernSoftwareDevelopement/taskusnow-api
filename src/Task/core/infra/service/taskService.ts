import { Task }  from '../../entity/Task';
import { TaskRepoInterface } from '../interface/TaskRepoInterface';
import { ValidationError } from '../../../middleware/ValdationError';


export class TaskService {
  private taskRepository: TaskRepoInterface;    

  constructor(taskRepository: TaskRepoInterface) {
    this.taskRepository = taskRepository;
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.getTasks();
  }

  async createTask(taskData: Task): Promise<Task> {
    const tmpTask = new Task({
      title: taskData.title,
      description: taskData.description,
      userid: taskData.userid,
    });  
    
    const validation = tmpTask.taskIsValid();

    if (!validation.valid) {
      throw new ValidationError(validation.error);
    }

    return this.taskRepository.createTask(tmpTask);
  }

  async getTaskByTaskID(taskID: string): Promise<Task> {
    return this.taskRepository.getTaskByTaskID(taskID);
  }
}
