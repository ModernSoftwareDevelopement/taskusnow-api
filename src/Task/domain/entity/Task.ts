import {
  TaskInterface,
  User,
  TimeSlot,
  SchedulingOption,
} from './TaskInterface';

export class Task {
  private taskId?: string;
  private title: string;
  private description: string;
  private user: User;
  private category: string;
  private location?: string;
  private budget: number;
  private scheduling: SchedulingOption;
  private specificDate?: Date;
  private timeslot?: TimeSlot;
  private createdAt?: Date;

  private readonly errors: { field: string; error: string }[] = [];

  private constructor(data: TaskInterface) {
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

  static create(data: TaskInterface): Task {
    return new Task(data);
  }

  public serialize(): TaskInterface {
    return {
      taskId: this.taskId,
      title: this.title,
      description: this.description,
      user: this.user,
      category: this.category,
      location: this.location,
      budget: this.budget,
      scheduling: this.scheduling,
      specificDate: this.specificDate,
      timeslot: this.timeslot,
      createdAt: this.createdAt,
    };
  }  

  getTaskId(): string | undefined {
    return this.taskId;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getUser(): User {
    return this.user;
  }

  getCategory(): string {
    return this.category;
  }

  getLocation(): string | undefined {
    return this.location;
  }

  getBudget(): number {
    return this.budget;
  }

  getScheduling(): SchedulingOption {
    return this.scheduling;
  }

  getSpecificDate(): Date | undefined {
    return this.specificDate;
  }

  getTimeslot(): TimeSlot | undefined {
    return this.timeslot;
  }

  getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setUser(user: User): void {
    this.user = user;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  setLocation(location: string | undefined): void {
    this.location = location;
  }

  setBudget(budget: number): void {
    this.budget = budget;
  }

  setScheduling(scheduling: SchedulingOption): void {
    this.scheduling = scheduling;
  }

  setSpecificDate(specificDate: Date | undefined): void {
    this.specificDate = specificDate;
  }

  setTimeslot(timeslot: TimeSlot | undefined): void {
    this.timeslot = timeslot;
  }

  setCreatedAt(createdAt: Date | undefined): void {
    this.createdAt = createdAt;
  }

  private errorObject(field: string, error: string): { field: string; error: string } {
    return { field, error };
  }

  private addErrorOnCondition(condition: boolean, field: string, error: string): void {
    if (condition) {
      this.errors.push(this.errorObject(field, error));
    }
  }

  private validateRequiredFields(): void {
    this.addErrorOnCondition(!this.title, 'title', 'Title is required.');
    this.addErrorOnCondition(!this.description, 'description', 'Description is required.');
    this.addErrorOnCondition(!this.category, 'category', 'Category is required.');
    this.addErrorOnCondition(!this.location, 'location', 'Location is required.');
    this.addErrorOnCondition(!this.budget, 'budget', 'Budget is required.');
    this.addErrorOnCondition(!this.user?.userId, 'userId', 'User ID is required.');
    this.addErrorOnCondition(!this.scheduling, 'scheduling', 'Scheduling option is required.');
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