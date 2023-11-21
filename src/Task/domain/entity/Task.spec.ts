import { Task } from './Task';
import { SchedulingOption } from './TaskInterface';

describe('Task Entity', () => {
  const defaultTaskData = {
    title: 'Sample Title',
    description: 'Sample Description',
    user: {
      userId: 'user123',
      fullName: 'John Doe',
    },
    category: 'Sample Category',
    location: 'Sample Location',
    budget: 100,
    scheduling: SchedulingOption.FLEXIBLE,
    timeslot: {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    },
    createdon: new Date(),
  };

  it('should return valid result when taskIsValid method is called', () => {
    const task = new Task(defaultTaskData);
    const result = task.taskIsValid();
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing timeslot for flexible scheduling', () => {
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.FLEXIBLE, timeslot: undefined };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({
      valid: false,
      errors: [
        {
          field: 'timeslot',
          error: 'Time period is required for this scheduling option.',
        },
      ],
    });
  });

  it('should create a valid task with specificDate scheduling and a date', () => {
    const specificDate = new Date('2023-12-10');
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.SEPCIFIC_DATE, specificDate };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for specificDate scheduling', () => {
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.SEPCIFIC_DATE, specificDate: undefined };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({
      valid: false,
      errors: [
        {
          field: 'specificDate',
          error: 'Date is required for this scheduling option.',
        },
      ],
    });
  });

  it('should create a valid task with BEFORE_DATE scheduling and a date', () => {
    const BEFORE_DATE = new Date('2023-12-09');
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.BEFORE_DATE, specificDate: BEFORE_DATE };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for BEFORE_DATE scheduling', () => {
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.BEFORE_DATE, specificDate: undefined };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({
      valid: false,
      errors: [
        {
          field: 'specificDate',
          error: 'Date is required for this scheduling option.',
        },
      ],
    });
  });

  it('should return an error for an invalid budget (less than 5)', () => {
    const taskData = { ...defaultTaskData, budget: 2 };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({
      valid: false,
      errors: [
        { field: 'budget', error: 'Budget must be between 5 and 9999.' },
      ],
    });
  });

  it('should return an error for an invalid budget (greater than 9999)', () => {
    const taskData = { ...defaultTaskData, budget: 10000 };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({
      valid: false,
      errors: [
        { field: 'budget', error: 'Budget must be between 5 and 9999.' },
      ],
    });
  });

  it('should return errors for empty title', () => {
    const taskData = { ...defaultTaskData, title: '' };
    const task = new Task(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({
      valid: false,
      errors: [
        { field: 'title', error: 'Title is required.' },        
      ],
    });
  });
});
