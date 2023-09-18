import { createUserRepository } from './index';

describe('Create dependencies', () => {
  it('should create user repository instance', () => {
    expect(createUserRepository).toBeDefined();
  });
});
