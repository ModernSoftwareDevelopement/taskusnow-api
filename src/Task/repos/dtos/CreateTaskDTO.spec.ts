import { CreateTaskDTO } from './CreateTaskDTO';

describe('CreateTaskDTO Testing!', () => {
  it('should validate data against CreateTaskDTO structure', () => {
    const data = {
      title: 'Sample Task',
      description: 'This is a sample task',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
    };

    const expectedKeys: (keyof CreateTaskDTO)[] = [
      'title',
      'description',
      'user',
    ];

    const dataKeys = Object.keys(data) as (keyof CreateTaskDTO)[];

    expectedKeys.forEach((key) => {
      expect(dataKeys.includes(key)).toBe(true);
    });

    expect(typeof data.title).toBe('string');
    expect(typeof data.description).toBe('string');
    expect(typeof data.user.userId).toBe('string');
  });
});
