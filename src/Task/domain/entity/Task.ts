import { TaskInterface } from './TaskInterface';

export class Task {
  taskId?: string;
  title: string;
  description: string;
  user: {
    userId: string;
    fullName: string;
  };

  constructor(data: TaskInterface) {
    this.taskId = data.taskId;
    this.title = data.title;
    this.description = data.description;
    this.user = data.user;
  }

  taskIsValid?(): { valid: boolean; error?: string } {
    if (!this.title || !this.description) {
      return { valid: false, error: 'Empty or invalid title or description' };
    }

    if (!this.user.userId || this.user.userId.length <= 0) {
      return { valid: false, error: 'Invalid userid' };
    }

    return { valid: true };
  }
}
