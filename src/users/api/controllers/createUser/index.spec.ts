import { createUserController } from './index';

describe('Create dependencies', () => {
  it('should create user controller instance', () => {
    expect(createUserController).toBeDefined();
  });
});
