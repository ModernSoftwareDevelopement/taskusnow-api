import { CreateTaskDTO } from './CreateTaskDTO';

describe('CreateTaskDTO Testing!', () => {
  it('should validate data against CreateTaskDTO structure', () => {
    const data = {
      title: 'Sample Task',
      description: 'This is a sample task',
      userid: 123,
    };

    const expectedKeys: (keyof CreateTaskDTO)[] = [
      'title',
      'description',
      'userid',
    ];

    const dataKeys = Object.keys(data) as (keyof CreateTaskDTO)[];

    expectedKeys.forEach((key) => {
      expect(dataKeys.includes(key)).toBe(true);
    });

    expect(typeof data.title).toBe('string');
    expect(typeof data.description).toBe('string');
    expect(typeof data.userid).toBe('number');
  });
});
