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
    createdAt: new Date(),
  };

  it('should return valid result when taskIsValid method is called', () => {
    const task = Task.create(defaultTaskData);
    const result = task.taskIsValid();

    expect(result).toEqual({ valid: true });
  });

  it('should detect missing timeslot for flexible scheduling', () => {
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot: undefined,
    };

    const task = Task.create(taskData);
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
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.SEPCIFIC_DATE,
      specificDate,
    };

    const task = Task.create(taskData);
    const result = task.taskIsValid();

    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for specificDate scheduling', () => {
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.SEPCIFIC_DATE,
      specificDate: undefined,
    };
    const task = Task.create(taskData);
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
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.BEFORE_DATE,
      specificDate: BEFORE_DATE,
    };

    const task = Task.create(taskData);
    const result = task.taskIsValid();

    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for BEFORE_DATE scheduling', () => {
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.BEFORE_DATE,
      specificDate: undefined,
    };

    const task = Task.create(taskData);
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

    const task = Task.create(taskData);
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

    const task = Task.create(taskData);
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

    const task = Task.create(taskData);
    const result = task.taskIsValid();

    expect(result).toEqual({
      valid: false,
      errors: [{ field: 'title', error: 'Title is required.' }],
    });
  });

  it('should serialize task to a plain object', () => {
    const task = Task.create(defaultTaskData);
    const serializedTask = task.serialize();

    expect(serializedTask).toEqual(defaultTaskData);
  });

  it('should get default taskId', () => {
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.SEPCIFIC_DATE,
      specificDate: undefined,
      taskId: undefined,
    };
    const task = Task.create(taskData);

    expect(task.getTaskId()).toEqual(taskData.taskId);
  });

  it('should set and get default title', () => {
    const task = Task.create(defaultTaskData);

    const newTitle = 'New Title';
    task.setTitle(newTitle);

    expect(task.getTitle()).toEqual(newTitle);
  });

  it('should set and get default description', () => {
    const task = Task.create(defaultTaskData);

    const newDescription = 'New Description';
    task.setDescription(newDescription);

    expect(task.getDescription()).toEqual(newDescription);
  });

  it('should set and get default user', () => {
    const task = Task.create(defaultTaskData);

    const newUser = { userId: 'newUserId', fullName: 'New User' };
    task.setUser(newUser);

    expect(task.getUser()).toEqual(newUser);
  });

  it('should set and get default category', () => {
    const task = Task.create(defaultTaskData);

    const newCategory = 'New Category';
    task.setCategory(newCategory);

    expect(task.getCategory()).toEqual(newCategory);
  });

  it('should set and get default location', () => {
    const task = Task.create(defaultTaskData);

    const newLocation = 'New Location';
    task.setLocation(newLocation);

    expect(task.getLocation()).toEqual(newLocation);
  });

  it('should set and get default budget', () => {
    const task = Task.create(defaultTaskData);

    const newBudget = 200;
    task.setBudget(newBudget);

    expect(task.getBudget()).toEqual(newBudget);
  });

  it('should set and get default scheduling', () => {
    const task = Task.create(defaultTaskData);

    const newScheduling = SchedulingOption.FLEXIBLE;
    task.setScheduling(newScheduling);

    expect(task.getScheduling()).toEqual(newScheduling);
  });

  it('should set and get default specificDate', () => {
    const taskData = {
      ...defaultTaskData,
      scheduling: SchedulingOption.SEPCIFIC_DATE,
      specificDate: undefined,
      taskId: undefined,
    };
    const task = Task.create(taskData);

    const newSpecificDate = new Date('2023-12-11');
    task.setSpecificDate(newSpecificDate);

    expect(task.getSpecificDate()).toEqual(newSpecificDate);
  });

  it('should set and get default timeslot', () => {
    const task = Task.create(defaultTaskData);

    const newTimeslot = { startTime: '1:00 PM', endTime: '3:00 PM' };
    task.setTimeslot(newTimeslot);

    expect(task.getTimeslot()).toEqual(newTimeslot);
  });

  it('should set and get default createdAt', () => {
    const task = Task.create(defaultTaskData);

    const newCreatedAt = new Date('2023-12-08');
    task.setCreatedAt(newCreatedAt);

    expect(task.getCreatedAt()).toEqual(newCreatedAt);
  });
});
