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
    this.createdon = data.createdon;
  }

  private errorObject(field: string, error: string): { field: string; error: string } {
    return { field, error };
  }

  private addErrorIf(condition: boolean, field: string, error: string): void {
    if (condition) {
      this.errors.push(this.errorObject(field, error));
    }
  }

  private validateRequiredFields(): void {
    this.addErrorIf(!this.title, 'title', 'Title is required.');
    this.addErrorIf(!this.description, 'description', 'Description is required.');
    this.addErrorIf(!this.category, 'category', 'Category is required.');
    this.addErrorIf(!this.location, 'location', 'Location is required.');
    this.addErrorIf(!this.budget, 'budget', 'Budget is required.');
    this.addErrorIf(!this.user?.userId, 'userId', 'User ID is required.');
    this.addErrorIf(!this.scheduling, 'scheduling', 'Scheduling option is required.');
  }

  private validateBudget(): void {
    this.addErrorIf(this.budget < 5 || this.budget > 9999, 'budget', 'Budget must be between 5 and 9999.');
  }

  private validateSpecificDate(): void {
    if (
      (this.scheduling === SchedulingOption.SEPCIFIC_DATE ||
        this.scheduling === SchedulingOption.BEFORE_DATE) &&
      (!this.specificDate || isNaN(this.specificDate.getTime()))
    ) {
      this.addErrorIf(true, 'specificDate', 'Date is required for this scheduling option.');
    }
  }

  private validateTimeslot(): void {
    this.addErrorIf(this.scheduling === SchedulingOption.FLEXIBLE && !this.timeslot, 'timeslot', 'Time period is required for this scheduling option.');
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
