import { Task } from './Task';
import { SchedulingOption } from './TaskInterface';

describe('Task Entity', () => {
  it('should return valid result when taskIsValid method is called', () => {
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.Flexible,
      timeslot,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing timeslot for flexible scheduling', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.Flexible,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
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
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.SpecificDate,
      specificDate,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for specificDate scheduling', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.SpecificDate,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
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

  it('should create a valid task with beforeDate scheduling and a date', () => {
    const beforeDate = new Date('2023-12-09');
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.BeforeDate,
      specificDate: beforeDate,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for beforeDate scheduling', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.BeforeDate,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
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
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const task = new Task({
      title: 'Invalid Budget Task',
      description: 'Task with an invalid budget',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 2,
      scheduling: SchedulingOption.Flexible,
      timeslot,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
    expect(result).toEqual({
      valid: false,
      errors: [
        { field: 'budget', error: 'Budget must be between 5 and 9999.' },
      ],
    });
  });

  it('should return an error for an invalid budget (greater than 9999)', () => {
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const task = new Task({
      title: 'Invalid Budget Task',
      description: 'Task with an invalid budget',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 10000,
      scheduling: SchedulingOption.Flexible,
      timeslot,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
    expect(result).toEqual({
      valid: false,
      errors: [
        { field: 'budget', error: 'Budget must be between 5 and 9999.' },
      ],
    });
  });

  it('should return an error for one or more required fields', () => {
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const task = new Task({
      title: '',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.Flexible,
      timeslot,
      createdon: new Date(),
    });

    const result =
      task.taskIsValid && typeof task.taskIsValid === 'function'
        ? task.taskIsValid()
        : null;
    expect(result).toEqual({
      valid: false,
      errors: [
        {
          field: 'general',
          error: 'One or more required fields are empty or invalid.',
        },
      ],
    });
  });
});
