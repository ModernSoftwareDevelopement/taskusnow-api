import { User, SchedulingOption,TimeSlot } from '../../domain/entity/TaskInterface'

export interface CreateTaskDto {
  title: string;
  description: string;
  user: User;
  category: string;
  location?: string;
  budget: number;
  scheduling: SchedulingOption;
  specificDate?: Date;
  timeslot?: TimeSlot;  
}

