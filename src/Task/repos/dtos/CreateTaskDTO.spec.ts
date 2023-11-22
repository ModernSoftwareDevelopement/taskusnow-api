import { CreateTaskDto } from './CreateTaskDTO';
import { SchedulingOption } from '../../domain/entity/TaskInterface'

describe('CreateTaskDTO Testing!', () => {
  it('should validate data against CreateTaskDTO structure', () => {
    const timeslot = {
      startTime: '10:00 AM',
      endTime: '12:00 PM',
    };
    const data = {
      title: 'Sample Task',
      description: 'This is a sample task',
      user: {
        userId: 'user123',
        fullName: 'John Doe',
      },
      category: 'Sample Category',
      location: 'Sample Location',
      budget: 100,
      scheduling: SchedulingOption.FLEXIBLE,
      timeslot,      
    };

    const expectedKeys: (keyof CreateTaskDto)[] = [
      'title',
      'description',
      'user',
      'category',
      'location',
      'budget',
      'scheduling',
      'timeslot',      
    ];

    const dataKeys = Object.keys(data) as (keyof CreateTaskDto)[];

    expectedKeys.forEach((key) => {
      expect(dataKeys.includes(key)).toBe(true);
    });

    expect(typeof data.title).toBe('string');
    expect(typeof data.description).toBe('string');
    expect(typeof data.user.userId).toBe('string');
    expect(typeof data.category).toBe('string');
    expect(typeof data.location).toBe('string');
    expect(typeof data.budget).toBe('number');
    expect(typeof data.scheduling).toBe('string');
    expect(typeof data.timeslot.startTime).toBe('string');
    expect(typeof data.timeslot.endTime).toBe('string');    
  });
});
