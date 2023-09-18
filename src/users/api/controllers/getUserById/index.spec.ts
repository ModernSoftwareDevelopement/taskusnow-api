import { getUserByIdController } from './index';

describe('Create dependencies', () => {
  it('should create "find user by id" controller instance', () => {
    expect(getUserByIdController).toBeDefined();
  });
});
