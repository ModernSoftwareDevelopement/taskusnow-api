import { TaskInterface } from '../../domain/entity/TaskInterface';

export class CreateTaskDTO {
  title: string;
  description: string;
  userid: number;

  constructor(data: TaskInterface) {
    this.title = data.title;
    this.description = data.description;
    this.userid = data.userid;
  }
}
