import {
  createTaskController,
  getTaskbyTaskIDController,
  getTasksController,
} from './index';

describe('Create dependencies', () => {
  it('should create "create task" controller instance', () => {
    expect(createTaskController).toBeDefined();
  });

  it('should create "get tasks" controller instance', () => {
    expect(getTasksController).toBeDefined();
  });

  it('should create "get task by TaskID" controller instance', () => {
    expect(getTaskbyTaskIDController).toBeDefined();
  });
});
