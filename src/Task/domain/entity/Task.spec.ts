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
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.FLEXIBLE, timeslot: undefined };
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
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.SEPCIFIC_DATE, specificDate };
    const task = Task.create(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for specificDate scheduling', () => {
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.SEPCIFIC_DATE, specificDate: undefined };
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
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.BEFORE_DATE, specificDate: BEFORE_DATE };
    const task = Task.create(taskData);
    const result = task.taskIsValid();
    expect(result).toEqual({ valid: true });
  });

  it('should detect missing specificDate for BEFORE_DATE scheduling', () => {
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.BEFORE_DATE, specificDate: undefined };
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
      errors: [
        { field: 'title', error: 'Title is required.' },        
      ],
    });
  });

  it('should serialize task to a plain object', () => {
    const task = Task.create(defaultTaskData);
    const serializedTask = task.serialize();
    expect(serializedTask).toEqual(defaultTaskData);
  });

  it('should get and set values', () => {    
    const taskData = { ...defaultTaskData, scheduling: SchedulingOption.SEPCIFIC_DATE, specificDate: undefined, taskId: undefined };
    const task = Task.create(taskData);

    expect(task.getTaskId()).toEqual(taskData.taskId);
    expect(task.getTitle()).toEqual(taskData.title);
    expect(task.getDescription()).toEqual(taskData.description);
    expect(task.getUser()).toEqual(taskData.user);
    expect(task.getCategory()).toEqual(taskData.category);
    expect(task.getLocation()).toEqual(taskData.location);
    expect(task.getBudget()).toEqual(taskData.budget);
    expect(task.getScheduling()).toEqual(taskData.scheduling);
    expect(task.getSpecificDate()).toEqual(taskData.specificDate);
    expect(task.getTimeslot()).toEqual(taskData.timeslot);
    expect(task.getCreatedAt()).toEqual(taskData.createdAt);
  
    const newTitle = 'New Title';
    const newDescription = 'New Description';
    const newUser = { userId: 'newUserId', fullName: 'New User' };
    const newCategory = 'New Category';
    const newLocation = 'New Location';
    const newBudget = 200;
    const newScheduling = SchedulingOption.BEFORE_DATE;
    const newSpecificDate = new Date('2023-12-11');
    const newTimeslot = { startTime: '1:00 PM', endTime: '3:00 PM' };
    const newCreatedAt = new Date('2023-12-08');
  
    task.setTitle(newTitle);
    task.setDescription(newDescription);
    task.setUser(newUser);
    task.setCategory(newCategory);
    task.setLocation(newLocation);
    task.setBudget(newBudget);
    task.setScheduling(newScheduling);
    task.setSpecificDate(newSpecificDate);
    task.setTimeslot(newTimeslot);
    task.setCreatedAt(newCreatedAt);
  
    expect(task.getTitle()).toEqual(newTitle);
    expect(task.getDescription()).toEqual(newDescription);
    expect(task.getUser()).toEqual(newUser);
    expect(task.getCategory()).toEqual(newCategory);
    expect(task.getLocation()).toEqual(newLocation);
    expect(task.getBudget()).toEqual(newBudget);
    expect(task.getScheduling()).toEqual(newScheduling);
    expect(task.getSpecificDate()).toEqual(newSpecificDate);
    expect(task.getTimeslot()).toEqual(newTimeslot);
    expect(task.getCreatedAt()).toEqual(newCreatedAt);
  });
});
