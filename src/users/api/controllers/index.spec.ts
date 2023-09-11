import { createUserController, createUserUseCase } from './index';

describe('Create dependencies', () => {
  it('should create user controller instance', () => {
    expect(createUserController).toBeDefined();
  });

  it('should create user use case instance', () => {
    expect(createUserUseCase).toBeDefined();
  });
});
