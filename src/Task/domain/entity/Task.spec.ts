import { Task } from './Task';

describe('Task Entity', () => {
  it('should create a valid task', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      userid: 123,
    });     

    expect(task.taskIsValid()).toEqual({ valid: true });
  });

  it('should detect empty or invalid title', () => {
    const task = new Task({
      title: '',
      description: 'Sample Description',
      userid: 123,
    });

    expect(task.taskIsValid()).toEqual({
      valid: false,
      error: 'Empty or invalid title or description',
    });
  });

  it('should detect empty or invalid description', () => {
    const task = new Task({
      title: 'Sample Title',
      description: '',
      userid: 123,
    });

    expect(task.taskIsValid()).toEqual({
      valid: false,
      error: 'Empty or invalid title or description',
    });
  });

  it('should detect invalid userid', () => {
    const task = new Task({
      title: 'Sample Title',
      description: 'Sample Description',
      userid: -1,
    });

    expect(task.taskIsValid()).toEqual({
      valid: false,
      error: 'Invalid userid',
    });
  });
});
