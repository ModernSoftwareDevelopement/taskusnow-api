import { CreateTaskRepo, GetTaskRepo, GetTasksRepo } from './index';

describe('Create dependencies', () => {
  it('should create create-task repository instance', () => {
    expect(CreateTaskRepo).toBeDefined();
  });

  it('should create get-task repository instance', () => {
    expect(GetTaskRepo).toBeDefined();
  });

  it('should create get-tasks repository instance', () => {
    expect(GetTasksRepo).toBeDefined();
  });
});
