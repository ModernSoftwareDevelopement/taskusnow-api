import {
  TaskInterface,
  User,
  TimeSlot,
  SchedulingOption,
} from './TaskInterface';

export class Task {
  private _taskId?: string;
  private _title: string;
  private _description: string;
  private _user: User;
  private _category: string;
  private _location?: string;
  private _budget: number;
  private _scheduling: SchedulingOption;
  private _specificDate?: Date;
  private _timeslot?: TimeSlot;
  private _createdAt?: Date;

  private _errors: { field: string; error: string }[] = [];

  constructor(data: TaskInterface) {
    this._taskId = data.taskId;
    this._title = data.title;
    this._description = data.description;
    this._user = data.user;
    this._category = data.category;
    this._location = data.location;
    this._budget = data.budget;
    this._scheduling = data.scheduling;
    this._specificDate = data.specificDate;
    this._timeslot = data.timeslot;
    this._createdAt = data.createdAt;
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
      this._errors.push(this.errorObject(field, error));
    }
  }

  private validateRequiredFields(): void {
    this.addErrorOnCondition(!this._title, 'title', 'Title is required.');
    this.addErrorOnCondition(!this._description, 'description', 'Description is required.');
    this.addErrorOnCondition(!this._category, 'category', 'Category is required.');
    this.addErrorOnCondition(!this._location, 'location', 'Location is required.');
    this.addErrorOnCondition(!this._budget, 'budget', 'Budget is required.');
    this.addErrorOnCondition(!this._user?.userId, 'userId', 'User ID is required.');
    this.addErrorOnCondition(!this._scheduling, 'scheduling', 'Scheduling option is required.');
  }

  private validateBudget(): void {
    this.addErrorOnCondition(
      this._budget < 5 || this._budget > 9999,
      'budget',
      'Budget must be between 5 and 9999.',
    );
  }

  private validateSpecificDate(): void {
    if (
      (this.isScheduleWithSpecificDate() || this.isScheduleWithBeforeDate()) &&
      (!this._specificDate || isNaN(this._specificDate.getTime()))
    ) {
      this.addErrorOnCondition(
        true,
        'specificDate',
        'Date is required for this scheduling option.',
      );
    }
  }

  private isScheduleWithSpecificDate(): boolean {
    return this._scheduling === SchedulingOption.SEPCIFIC_DATE;
  }

  private isScheduleWithBeforeDate(): boolean {
    return this._scheduling === SchedulingOption.BEFORE_DATE;
  }

  private validateTimeslot(): void {
    this.addErrorOnCondition(
      this._scheduling === SchedulingOption.FLEXIBLE && !this._timeslot,
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
      valid: this._errors.length === 0,
      errors: this._errors.length > 0 ? this._errors : undefined,
    };
  }

  // Getters and Setters
  get taskId(): string | undefined {
    return this._taskId;
  }

  set taskId(value: string | undefined) {
    this._taskId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }

  get location(): string | undefined {
    return this._location;
  }

  set location(value: string | undefined) {
    this._location = value;
  }

  get budget(): number {
    return this._budget;
  }

  set budget(value: number) {
    this._budget = value;
  }

  get scheduling(): SchedulingOption {
    return this._scheduling;
  }

  set scheduling(value: SchedulingOption) {
    this._scheduling = value;
  }

  get specificDate(): Date | undefined {
    return this._specificDate;
  }

  set specificDate(value: Date | undefined) {
    this._specificDate = value;
  }

  get timeslot(): TimeSlot | undefined {
    return this._timeslot;
  }

  set timeslot(value: TimeSlot | undefined) {
    this._timeslot = value;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  set createdAt(value: Date | undefined) {
    this._createdAt = value;
  }

  get errors(): { field: string; error: string }[] {
    return this._errors;
  }
}
