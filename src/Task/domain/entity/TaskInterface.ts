export interface TaskInterface {
  taskid?: string;
  title: string;
  description: string;
  user: {
    userId: string;
    fullName: string;
  };
}
