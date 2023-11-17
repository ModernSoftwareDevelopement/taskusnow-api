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
  Flexible = 'flexible',
  SpecificDate = 'specificDate',
  BeforeDate = 'beforeDate',
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface User {
  userId: string;
  fullName: string;
}
