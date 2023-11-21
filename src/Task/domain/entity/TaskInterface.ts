export interface TaskInterface {
  taskId?: string;
  title: string;
  description: string;
  user: User;
  category: string;
  location?: string;
  budget: number;
  scheduling: SchedulingOption;
  specificDate?: Date;
  timeslot?: TimeSlot;
  createdon?: Date;
}

export enum SchedulingOption {
  FLEXIBLE = 'FLEXIBLE',
  SEPCIFIC_DATE = 'SEPCIFIC_DATE',
  BEFORE_DATE = 'BEFORE_DATE',
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface User {
  userId: string;
  fullName: string;
}
