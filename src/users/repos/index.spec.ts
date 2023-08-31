import { userRepo } from './index';

describe('Create dependencies', () => {
  it('should create user repository instance', () => {
    expect(userRepo).toBeDefined();
  });
});
