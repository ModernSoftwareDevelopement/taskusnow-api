import { CreateTaskRepoInterface } from '../ICreateTaskRepository';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryTasks } from '../../InMemoryDataSource/InMemorydb';
import { CreateTaskDto } from '../../dtos/CreateTaskDTO';
import { GetTaskDto } from '../../dtos/GetTaskDTO';

export class InMemoryCreateTaskRepository implements CreateTaskRepoInterface {
  async createTask(taskData: CreateTaskDto): Promise<string> {
    const taskID: string = uuidv4();

    const newTask: GetTaskDto = {
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
    };

    InMemoryTasks.push(newTask);

    return taskID;
  }
}
