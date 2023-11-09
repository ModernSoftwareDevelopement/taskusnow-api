export interface GetTaskDTO {
  taskId?: string;
  title: string;
  description: string;
  user: {
    userId: string;
    fullName: string;
  };
}
