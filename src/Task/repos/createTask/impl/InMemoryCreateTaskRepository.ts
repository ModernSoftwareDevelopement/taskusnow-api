import { CreateTaskRepoInterface } from '../ICreateTaskRepository';
import { Task } from '../../../domain/entity/Task';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';

export class InMemoryCreateTaskRepository implements CreateTaskRepoInterface {
  async createTask(taskData: Task): Promise<string> {
    const taskID: string = uuidv4();

    taskData.taskId = taskID;

    InMemoryTasks.push(taskData);

    return taskID;
  }
}
