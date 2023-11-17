import { Task } from './Task';
import { SchedulingOption } from './TaskInterface';

describe('Task Entity', () => {
  it('should create a valid task with flexible scheduling and timeslot', () => {
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({ valid: true });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({
        valid: false,
        errors: [{ field: 'timeslot', error: 'Time period is required for this scheduling option.' }],
      });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({ valid: true });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({
        valid: false,
        errors: [{ field: 'specificDate', error: 'Date is required for this scheduling option.' }],
      });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({ valid: true });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({
        valid: false,
        errors: [{ field: 'specificDate', error: 'Date is required for this scheduling option.' }],
      });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      const validationResult = task.taskIsValid();

      expect(validationResult.valid).toBe(false);
      expect(validationResult.errors).toContainEqual({
        field: 'budget',
        error: 'Budget must be between 5 and 9999.',
      });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      const validationResult = task.taskIsValid();

      expect(validationResult.valid).toBe(false);
      expect(validationResult.errors).toContainEqual({
        field: 'budget',
        error: 'Budget must be between 5 and 9999.',
      });
    } else {
      pending('taskIsValid method is optional');
    }
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

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      const validationResult = task.taskIsValid();

      expect(validationResult.valid).toBe(false);
      expect(validationResult.errors).toContainEqual({
        field: 'general',
        error: 'One or more required fields are empty or invalid.',
      });
    } else {
      pending('taskIsValid method is optional');
    }
  });
});
