import { SchedulingOption, User, TimeSlot } from '../../domain/entity/TaskInterface';

export interface GetTaskByTaskIDResponse {
  taskId: string;
  title: string;
  description: string;
  user: User;
  category: string;
  location?: string;
  budget: number;
  scheduling: SchedulingOption;
  specificDate?: Date;
  timeslot?: TimeSlot;
  createdAt?: Date;
}
