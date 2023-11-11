export interface CreateTaskDTO {
  title: string;
  description: string;
  user: {
    userId: string;
    fullName: string;
  };
}
