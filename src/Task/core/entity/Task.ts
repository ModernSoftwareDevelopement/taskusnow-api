import { TaskInterface } from "./TaskInterface";

export class Task {
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

    taskIsValid(): { valid: boolean; error?: string } {
        if (!this.title || !this.description) {
          return { valid: false, error: 'Empty or invalid title or description' };
        }
    
        if (this.userid <= 0) {
          return { valid: false, error: 'Invalid userid' };
        }
    
        return { valid: true };
      }
}
