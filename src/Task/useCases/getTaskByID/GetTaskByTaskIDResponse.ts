export interface GetTaskByTaskIDResponse {
  taskId: string;
  title: string;
  description: string;
  user: {
    userId: string;
    fullName: string;
  };
}
