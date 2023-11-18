import { createReviewRepository } from './index';

describe('Create dependencies', () => {
  it('should create review repository instance', () => {
    expect(createReviewRepository).toBeDefined();
  });
});
