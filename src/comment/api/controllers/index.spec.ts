import { getCommentsController } from './index';

describe('Create dependencies', () => {
  it('should create get comments controller instance', () => {
    expect(getCommentsController).toBeDefined();
  });
});
