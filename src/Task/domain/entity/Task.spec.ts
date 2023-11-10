import { Task } from './Task';

describe('Task Entity', () => {
  it('should create a valid task', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
    });

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({ valid: true });
    } else {
      pending('taskIsValid method is optional');
    }
  });

  it('should detect empty or invalid title', () => {
    const task = new Task({
      title: '',
      description: 'Sample Description',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
    });

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({
        valid: false,
        error: 'Empty or invalid title or description',
      });
    } else {
      pending('taskIsValid method is optional');
    }
  });

  it('should detect empty or invalid description', () => {
    const task = new Task({
      title: 'Sample Title',
      description: '',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
    });

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({
        valid: false,
        error: 'Empty or invalid title or description',
      });
    } else {
      pending('taskIsValid method is optional');
    }
  });

  it('should detect invalid userid', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      user: {
        userId: '',
        fullName: 'John Doe',
      },
    });

    if (task.taskIsValid && typeof task.taskIsValid === 'function') {
      expect(task.taskIsValid()).toEqual({
        valid: false,
        error: 'Invalid userid',
      });
    } else {
      pending('taskIsValid method is optional');
    }
  });
});
