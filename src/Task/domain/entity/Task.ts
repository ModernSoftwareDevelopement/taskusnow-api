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
  createdAt?: Date;

  private errors: { field: string; error: string }[] = [];

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
    this.createdAt = data.createdAt;
  }

  private errorObject(field: string, error: string): { field: string; error: string } {
    return { field, error };
  }

  private addErrorOnCondition(
    condition: boolean,
    field: string,
    error: string,
  ): void {
    if (condition) {
      this.errors.push(this.errorObject(field, error));
    }
  }

  private validateRequiredFields(): void {
    this.addErrorOnCondition(!this.title, 'title', 'Title is required.');
    this.addErrorOnCondition(!this.description,'description','Description is required.',);
    this.addErrorOnCondition(!this.category,'category','Category is required.',);
    this.addErrorOnCondition(!this.location,'location','Location is required.',);
    this.addErrorOnCondition(!this.budget, 'budget', 'Budget is required.');
    this.addErrorOnCondition(!this.user?.userId,'userId','User ID is required.',);
    this.addErrorOnCondition(!this.scheduling,'scheduling','Scheduling option is required.',);
  }

  private validateBudget(): void {
    this.addErrorOnCondition(
      this.budget < 5 || this.budget > 9999,
      'budget',
      'Budget must be between 5 and 9999.',
    );
  }

  private validateSpecificDate(): void {
    if (
      (this.isScheduleWithSpecificDate() || this.isScheduleWithBeforeDate()) &&
      (!this.specificDate || isNaN(this.specificDate.getTime()))
    ) {
      this.addErrorOnCondition(
        true,
        'specificDate',
        'Date is required for this scheduling option.',
      );
    }
  }

  private isScheduleWithSpecificDate(): boolean {
    return this.scheduling === SchedulingOption.SEPCIFIC_DATE;
  }

  private isScheduleWithBeforeDate(): boolean {
    return this.scheduling === SchedulingOption.BEFORE_DATE;
  }

  private validateTimeslot(): void {
    this.addErrorOnCondition(
      this.scheduling === SchedulingOption.FLEXIBLE && !this.timeslot,
      'timeslot',
      'Time period is required for this scheduling option.',
    );
  }

  taskIsValid(): {
    valid: boolean;
    errors?: { field: string; error: string }[];
  } {
    this.validateRequiredFields();
    this.validateBudget();
    this.validateSpecificDate();
    this.validateTimeslot();

    return {
      valid: this.errors.length === 0,
      errors: this.errors.length > 0 ? this.errors : undefined,
    };
  }
}
