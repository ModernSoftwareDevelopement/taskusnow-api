import {
  TaskInterface,
  User,
  TimeSlot,
  SchedulingOption,
} from './TaskInterface';

export class Task {
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

  constructor(data: TaskInterface) {
    this.taskId = data.taskId;
    this.title = data.title;
    this.description = data.description;
    this.user = data.user;
    this.category = data.category;
    this.location = data.location;
    this.budget = data.budget;
    this.scheduling = data.scheduling;
    this.specificDate = data.specificDate;
    this.timeslot = data.timeslot;
    this.createdon = data.createdon;
  }

  private errorObject?(
    field: string,
    error: string,
  ): { field: string; error: string } {
    return { field, error };
  }

  taskIsValid?(): {
    valid: boolean;
    errors?: { field: string; error: string }[];
  } {
    const errors: { field: string; error: string }[] = [];

    if (
      !this.title ||
      !this.description ||
      !this.category ||
      !this.location ||
      !this.budget ||
      !this.user?.userId ||
      !this.scheduling
    ) {
      errors.push(
        this.errorObject
          ? this.errorObject(
              'general',
              'One or more required fields are empty or invalid.',
            )
          : {
              field: 'general',
              error: 'One or more required fields are empty or invalid.',
            },
      );
    }

    if (this.budget < 5 || this.budget > 9999) {
      errors.push(
        this.errorObject
          ? this.errorObject('budget', 'Budget must be between 5 and 9999.')
          : { field: 'budget', error: 'Budget must be between 5 and 9999.' },
      );
    }

    if (
      (this.scheduling === SchedulingOption.SpecificDate ||
        this.scheduling === SchedulingOption.BeforeDate) &&
      (!this.specificDate || isNaN(this.specificDate.getTime()))
    ) {
      errors.push(
        this.errorObject
          ? this.errorObject(
              'specificDate',
              'Date is required for this scheduling option.',
            )
          : {
              field: 'specificDate',
              error: 'Date is required for this scheduling option.',
            },
      );
    }

    if (this.scheduling === SchedulingOption.Flexible && !this.timeslot) {
      errors.push(
        this.errorObject
          ? this.errorObject(
              'timeslot',
              'Time period is required for this scheduling option.',
            )
          : {
              field: 'timeslot',
              error: 'Time period is required for this scheduling option.',
            },
      );
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}
