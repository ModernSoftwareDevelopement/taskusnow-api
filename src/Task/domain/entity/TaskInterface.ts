export interface TaskInterface {
  taskId?: string;
  title: string;
  description: string;
  user: {
    userId: string;
    fullName: string;
  };
}
