import { GetCommentsRepo } from './index';

describe('Create dependencies', () => { 
  it('should create get comments repository instance', () => {
    expect(GetCommentsRepo).toBeDefined();
  });
});
