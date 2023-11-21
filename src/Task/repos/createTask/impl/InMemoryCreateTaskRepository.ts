import { CreateTaskRepoInterface } from '../ICreateTaskRepository';
import { Task } from '../../../domain/entity/Task';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';
import { CreateTaskDTO } from '../../dtos/CreateTaskDTO';

export class InMemoryCreateTaskRepository implements CreateTaskRepoInterface {
  async createTask(taskData: CreateTaskDTO): Promise<string> {
    const taskID: string = uuidv4();

    const newTask: Task = new Task({
      taskId: taskID,
      title: taskData.title,
      description: taskData.description,
      user: {
        userId: taskData.user.userId,
        fullName: taskData.user.fullName,
      },
      category: taskData.category,
      location: taskData.location,
      budget: taskData.budget,
      scheduling: taskData.scheduling,
      specificDate: taskData.specificDate,
      timeslot: taskData.timeslot,
      createdAt: new Date(),  
    });

    InMemoryTasks.push(newTask);

    return taskID;
  }
}
