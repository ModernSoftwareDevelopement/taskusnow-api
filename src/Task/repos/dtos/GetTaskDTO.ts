import { TaskInterface } from '../../domain/entity/TaskInterface';

export class GetTaskDTO {
  taskId?: string;
  title: string;
  description: string;
  userid: number;

  constructor(data: TaskInterface) {
    this.taskId = data.taskid;
    this.title = data.title;
    this.description = data.description;
    this.userid = data.userid;
  }
}
